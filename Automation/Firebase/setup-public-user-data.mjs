import { readFile } from "node:fs/promises";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// NOTE: This requires the private file firebase-admin, which is in gitignore.
// Whenever I need to use this script, I must download a new admin JSON from firebase
const serviceAccount = JSON.parse(
  await readFile(
    new URL("./firebase-admin.json", import.meta.url),
    "utf8"
  )
);

initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth();
const db = getFirestore();

async function forEachAuthUser(callback) {
  let pageToken;
  let found = 0;
  let processed = 0;
  let skipped = 0;
  let failed = 0;

  do {
    const result = await auth.listUsers(1000, pageToken);

    for (const user of result.users) {
      found++;

      try {
        const callbackResult = await callback(user, {
          auth,
          db,
        });

        if (callbackResult === false) {
          skipped++;
        } else {
          processed++;
        }
      } catch (error) {
        failed++;
        console.error(`Failed for user ${user.uid}:`, error);
      }
    }

    pageToken = result.pageToken;
  } while (pageToken);

  return {
    found,
    processed,
    skipped,
    failed,
  };
}

const result = await forEachAuthUser(async function (user, { db }) {
  if (!user.email) {
    console.warn(`Skipping ${user.uid}: user has no email.`);
    return false;
  }

  await db
    .collection("public-user-data")
    .doc(user.uid)
    .set(
      {
        email: user.email.toLowerCase(),
      },
      {
        merge: true,
      }
    );

  console.log(`Updated ${user.uid}: ${user.email}`);

  return true;
});

console.log("\nFinished.");
console.log(`Users found: ${result.found}`);
console.log(`Users processed: ${result.processed}`);
console.log(`Users skipped: ${result.skipped}`);
console.log(`Users failed: ${result.failed}`);