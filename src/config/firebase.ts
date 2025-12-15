/**
 * Initialize Firebase Admin SDK for Firestore.
 *
 * This initializer supports two modes (in order):
 * 1) Application Default Credentials (set `GOOGLE_APPLICATION_CREDENTIALS` to a
 *    service account JSON file path or use a runtime that provides ADC).
 * 2) Service account credentials provided via env vars: `FIREBASE_PROJECT_ID`,
 *    `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (the private key must contain
 *    literal newlines; `env.ts` already replaces "\\n" with actual newlines).
 */
import admin from "firebase-admin";
import { env } from "./env";

export const initFirebase = () => {
  if (admin.apps.length) return;

  // Prefer Application Default Credentials when available
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp();
    return;
  }

  // Fallback to explicit service account values from env
  if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY
      } as admin.ServiceAccount)
    });
    return;
  }

  // If neither method is available, log a helpful warning.
  // The rest of the app should guard calls to Firestore accordingly.
  // (Do not throw here to keep non-Firestore features usable in local dev.)
  // eslint-disable-next-line no-console
  console.warn(
    "Firebase Admin credentials not found. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_* env vars to enable Firestore."
  );
};

/**
 * Returns the Firestore instance. Call `initFirebase()` first (server startup does this).
 * If Firebase wasn't initialized because credentials are missing, calling `db()` will
 * still throw the normal admin SDK error which you should handle where used.
 */
export const db = () => admin.firestore();
