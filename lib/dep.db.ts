// lib/db.ts
import { openDB } from "idb";

const dbName = "MBTS";
const storeNames = [
  "profile",
  "battlestats",
  "bounties"
]

export async function createDb(name: string, version = 1) {
  if (typeof window === "undefined") throw new Error("createDb can only be called in the browser.");
  return openDB(name, version);
}

export async function addObjectStores(name: string, storeNames: string []) {
  console.log("Adding object stores to database");
  if (typeof window === "undefined") throw new Error("addObjectStores can only be called in the browser.");
  const db = await openDB(name);
  const newVersion = db.version + 1;
  db.close();

  return openDB(name, newVersion, {
    upgrade(db) {
      for (const storeName of storeNames) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
          console.log(`Object store ${storeName} created`);
        }
      }
    },
  });
}

export async function getDb(name: string) {
  if (typeof window === "undefined") throw new Error("getDb can only be called in the browser.");

  const dbs = await indexedDB.databases?.();
  const exists = dbs?.some(db => db.name === name);

  if (!exists) throw new Error(`DB '${name}' does not exist`);

  return openDB(name);
}

export async function saveData(dbname: string, storeName: string, data: any, id: string) {
  const db = await getDb(dbname);
  await db.put(storeName, data, id);
}

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
    await addObjectStores(dbName, storeNames)
  }
}