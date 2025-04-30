import { createDb, addObjectStores, getDb } from "@/lib/db";

const dbName = "MBTS";
const storeNames = [
  "profile",
  "battlestats",
  "employmentCompany"
]

export async function initDatabase() {

  //check if database exists
  console.log("Checking if database exists");
  let db = await getDb(dbName);
  if (!db) {
    await createDb(dbName)
    db = await getDb(dbName);
    console.log("Database created");
  } else {
    console.log("Database exists");
    addObjectStores(dbName, storeNames)
  }
}