require('dotenv').config();
const mongoose = require('mongoose');
const Nick = require('../models/Nickname');

(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: 'ASAP_DB' });

  const total = await Nick.countDocuments();
  const demo = await Nick.countDocuments({ created_by: /^demo_user_/ });
  const withComments = await Nick.countDocuments({ 'comments.0': { $exists: true } });
  const withLikes = await Nick.countDocuments({ likes: { $exists: true, $ne: [] } });

  console.log({ total, demo, withComments, withLikes });
  await mongoose.disconnect();
})();
