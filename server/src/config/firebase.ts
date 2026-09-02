import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let dbManager: admin.firestore.Firestore | null = null;
let storageManager: admin.storage.Storage | null = null;
let authManager: admin.auth.Auth | null = null;
let isFirebaseConfigured = false;

try {
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });

    dbManager = admin.firestore();
    storageManager = admin.storage();
    authManager = admin.auth();
    isFirebaseConfigured = true;
    console.log('[FIREBASE] Firebase Admin SDK initialized successfully.');
  } else {
    console.log('[FIREBASE] Firebase credentials not provided in env. Using active high-performance local persistent store.');
  }
} catch (err) {
  console.warn('[FIREBASE_WARN] Failed to initialize Firebase Admin SDK:', err);
}

export { admin, dbManager, storageManager, authManager, isFirebaseConfigured };
