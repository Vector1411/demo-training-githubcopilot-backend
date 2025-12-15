/**
 * Copilot: Implement server entry.
 * Load env, init firebase admin, create app, listen on PORT.
 */
import "dotenv/config";
import { createApp } from "./app";
import { initFirebase } from "./config/firebase";
import { env } from "./config/env";

async function main() {
  initFirebase();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`[server] listening on :${env.PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
