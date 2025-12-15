#!/usr/bin/env node
/*
 * Quick check to see whether Firestore can be initialized.
 * - If FIRESTORE_EMULATOR_HOST is set or GOOGLE_APPLICATION_CREDENTIALS / FIREBASE_* present,
 *   it will attempt to list root collections (admin.firestore().listCollections()).
 */
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
// Load local env if present so GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_* get set
const localEnv = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(localEnv)) {
  try {
    require('dotenv').config({ path: localEnv });
  } catch (e) {
    // ignore
  }
}

async function run() {
  try {
    if (!admin.apps.length) {
      // Try initialize with ADC if available; otherwise will throw
      try {
        admin.initializeApp();
      } catch (e) {
        // Try to init with env-provided service account fields
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
          admin.initializeApp({
            credential: admin.credential.cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
            })
          });
        }
      }
    }

    const db = admin.firestore();
    const cols = await db.listCollections();
    console.log('Connected to Firestore — found', cols.length, 'root collections.');
    process.exit(0);
  } catch (err) {
    console.error('Firestore check failed:', err.message || err);
    process.exit(2);
  }
}

run();
