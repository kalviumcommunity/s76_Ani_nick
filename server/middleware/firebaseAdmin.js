const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key comes from env as a string with literal \n — replace them
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * Express middleware that verifies a Firebase ID token sent in the
 * Authorization header as "Bearer <token>".
 * On success, sets req.user = { uid, name, email, picture }
 */
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decoded.uid,
      name: decoded.name || decoded.email?.split("@")[0] || "Anonymous",
      email: decoded.email || "",
      picture: decoded.picture || "",
    };
    next();
  } catch (error) {
    console.error("Firebase token verification error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyFirebaseToken };
