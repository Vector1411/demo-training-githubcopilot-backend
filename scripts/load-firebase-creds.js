#!/usr/bin/env node
/*
 * Simple helper to load a Firebase service-account JSON into a local `.env.local`
 * for development. Usage:
 *
 *   node scripts/load-firebase-creds.js /path/to/service-account.json
 *
 * The script will create (or overwrite) `.env.local` at project root and
 * populate FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 * with the proper escaping for newlines. It will NOT commit the file.
 */
const fs = require("fs");
const path = require("path");

function usage() {
  console.log("Usage: node scripts/load-firebase-creds.js /path/to/service-account.json");
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 1) {
    usage();
    process.exit(1);
  }

  const jsonPath = path.resolve(argv[0]);
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(2);
  }

  let raw;
  try {
    raw = fs.readFileSync(jsonPath, "utf8");
  } catch (err) {
    console.error("Failed to read service account file:", err.message || err);
    process.exit(3);
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON in service account file:", err.message || err);
    process.exit(4);
  }

  const projectId = parsed.project_id || "";
  const clientEmail = parsed.client_email || parsed.clientEmail || "";
  const privateKey = parsed.private_key || parsed.privateKey || "";

  if (!projectId || !clientEmail || !privateKey) {
    console.error("Service account JSON does not contain required fields (project_id, client_email, private_key).");
    process.exit(5);
  }

  // Replace real newlines with \n so the .env loader (and our env.ts) can
  // restore them safely.
  const escapedKey = privateKey.replace(/\n/g, "\\n");

  const envLines = [];
  envLines.push(`# Generated from ${path.basename(jsonPath)} - DO NOT COMMIT`);
  envLines.push(`FIREBASE_PROJECT_ID=${projectId}`);
  envLines.push(`FIREBASE_CLIENT_EMAIL=${clientEmail}`);
  // Quote the key to be safe for special chars
  envLines.push(`FIREBASE_PRIVATE_KEY="${escapedKey}"`);
  envLines.push(`PORT=3001`);
  envLines.push(`JWT_SECRET=change-me`);
  envLines.push(`JWT_EXPIRES_IN=3600`);

  const out = envLines.join("\n") + "\n";
  const outPath = path.resolve(process.cwd(), ".env.local");

  try {
    fs.writeFileSync(outPath, out, { encoding: "utf8", flag: "w" });
    console.log(`Wrote .env.local to ${outPath}`);
    console.log("IMPORTANT: Do NOT commit .env.local. It's ignored by .gitignore.");
  } catch (err) {
    console.error("Failed to write .env.local:", err.message || err);
    process.exit(6);
  }
}

main();
