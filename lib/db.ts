// lib/db.ts
import { openDB } from 'idb';

async function getDb() {
  if (typeof window === "undefined") return null; // nur im Browser
  return openDB('mbts-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("basic")) {
        db.createObjectStore("basic");
      }
    },
  });
}

export async function saveBasic(data: any) {
  const db = await getDb();
  if (!db) return;
  await db.put('basic', data, 'basic');
}