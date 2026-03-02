const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NicknameModel = require('../models/Nickname');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'ASAP_DB';

const FIRST_NAMES = [
  'Aarav', 'Aanya', 'Ishaan', 'Mira', 'Rohan', 'Diya', 'Vihaan', 'Anika', 'Kabir', 'Tara',
  'Arjun', 'Naina', 'Zayan', 'Kiara', 'Reyansh', 'Sana', 'Dev', 'Ira', 'Om', 'Riya',
  'Yuki', 'Haru', 'Ren', 'Aoi', 'Sora', 'Maki', 'Kaito', 'Emi', 'Riku', 'Hina',
  'Leo', 'Maya', 'Noah', 'Lina', 'Zane', 'Nora', 'Eli', 'Ava', 'Kai', 'Mila',
  'Rin', 'Akira', 'Hinata', 'Sakura', 'Narumi', 'Asahi', 'Ichika', 'Touma', 'Yuna', 'Megumi'
];

const LAST_NAMES = [
  'Sharma', 'Mehta', 'Iyer', 'Nakamura', 'Suzuki', 'Tanaka', 'Sato', 'Kobayashi', 'Mori', 'Kato',
  'Singh', 'Patel', 'Verma', 'Rao', 'Das', 'Khan', 'Roy', 'Bose', 'Chopra', 'Gupta',
  'Storm', 'Blaze', 'Shadow', 'Knight', 'Phoenix', 'Wolf', 'Hawk', 'Vortex', 'Nova', 'Cipher'
];

const ANIME_CHARACTER_PAIRS = [
  ['Naruto', 'Naruto Uzumaki'],
  ['One Piece', 'Roronoa Zoro'],
  ['One Piece', 'Monkey D. Luffy'],
  ['Bleach', 'Ichigo Kurosaki'],
  ['Jujutsu Kaisen', 'Satoru Gojo'],
  ['Attack on Titan', 'Levi Ackerman'],
  ['Demon Slayer', 'Tanjiro Kamado'],
  ['My Hero Academia', 'Izuku Midoriya'],
  ['Death Note', 'Light Yagami'],
  ['Black Clover', 'Asta'],
  ['Solo Leveling', 'Sung Jin-Woo'],
  ['Dragon Ball Z', 'Vegeta'],
  ['Haikyuu!!', 'Shoyo Hinata'],
  ['Hunter x Hunter', 'Killua Zoldyck'],
  ['Chainsaw Man', 'Denji'],
  ['Tokyo Revengers', 'Mikey'],
  ['Blue Lock', 'Isagi Yoichi'],
  ['Vinland Saga', 'Thorfinn'],
  ['Code Geass', 'Lelouch Lamperouge'],
  ['Steins;Gate', 'Rintarou Okabe']
];

const NICKNAME_PREFIXES = [
  'Shadow', 'Storm', 'Flame', 'Phantom', 'King', 'Iron', 'Silent', 'Crimson', 'Frost', 'Thunder',
  'Ghost', 'Mad', 'Savage', 'Moon', 'Sun', 'Blade', 'Void', 'Nova', 'Titan', 'Chaos'
];

const NICKNAME_SUFFIXES = [
  'Reaper', 'Hunter', 'Slayer', 'Prince', 'Demon', 'Legend', 'Sage', 'Beast', 'Commander', 'Rogue',
  'Warden', 'Samurai', 'Warrior', 'Sniper', 'Guardian', 'Monarch', 'Wizard', 'Lion', 'Wolf', 'Dragon'
];

const COMMENT_TEMPLATES = [
  'This nickname fits perfectly!',
  'Absolute fire 🔥',
  'I laughed way too hard at this one.',
  'Accurate and hilarious.',
  'This should be trending.',
  'Peak anime fandom energy.',
  'Now I cannot unsee this nickname.',
  '10/10 community post.',
  'This one deserves more likes.',
  'Legendary naming skills.'
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];

const makeUsers = (count = 1000) => {
  const users = [];
  for (let i = 1; i <= count; i += 1) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    users.push({
      uid: `demo_user_${String(i).padStart(4, '0')}`,
      name: `${first} ${last}`,
    });
  }
  return users;
};

const makeUniqueSample = (arr, count) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
};

const makeDemoNicknames = (users, count = 1400) => {
  const docs = [];

  for (let i = 0; i < count; i += 1) {
    const creator = pick(users);
    const [anime, character] = pick(ANIME_CHARACTER_PAIRS);

    const baseNickname = `${pick(NICKNAME_PREFIXES)} ${pick(NICKNAME_SUFFIXES)}`;
    const nickname = `${baseNickname} #${i + 1}`;

    const likesCount = rand(5, 80);
    const likedUsers = makeUniqueSample(users, likesCount).map((u) => u.uid);

    const commentsCount = rand(2, 15);
    const comments = Array.from({ length: commentsCount }, () => {
      const commenter = pick(users);
      return {
        uid: commenter.uid,
        name: commenter.name,
        text: pick(COMMENT_TEMPLATES),
      };
    });

    const daysAgo = rand(0, 180);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    docs.push({
      nickname,
      character,
      anime,
      description: `${nickname} is what fans call ${character} from ${anime}. It started as a community meme and became iconic.`,
      created_by: creator.uid,
      created_by_name: creator.name,
      likes: likedUsers,
      comments,
      createdAt,
      updatedAt: createdAt,
    });
  }

  return docs;
};

const run = async () => {
  if (!MONGO_URI) {
    throw new Error('Missing MONGO_URI in server/.env');
  }

  await mongoose.connect(MONGO_URI, {
    dbName: DB_NAME,
  });

  console.log('Connected to MongoDB. Preparing demo seed...');

  // Remove only old demo-generated nicknames so reruns stay clean.
  const deleted = await NicknameModel.deleteMany({ created_by: /^demo_user_/ });
  console.log(`Removed ${deleted.deletedCount} previous demo nicknames.`);

  const users = makeUsers(1000);
  const demoNicknames = makeDemoNicknames(users, 1400);

  await NicknameModel.insertMany(demoNicknames, { ordered: false });

  console.log('✅ Demo seed complete.');
  console.log(`Users simulated: ${users.length}`);
  console.log(`Nicknames inserted: ${demoNicknames.length}`);

  await mongoose.disconnect();
  console.log('Disconnected.');
};

run().catch(async (error) => {
  console.error('❌ Demo seed failed:', error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
