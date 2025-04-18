// lib/db.ts
import { openDB } from "idb";

export async function getDb() {
  if (typeof window === "undefined") return null; // nur im Browser
  return openDB("mbts-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("basic")) {
        db.createObjectStore("basic");
      }
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile");
      }
    },
  });
}

export async function saveData(storeName: string, data: any, id: string) {
  const db = await getDb();
  if (!db) return;
  await db.put(storeName, data, id);
}


export async function storeExistsAndNotEmpty(storeName: string): Promise<boolean> {
    const db = await getDb();
    if (!db) return false;
    if (!db.objectStoreNames.contains(storeName)) return false;
  
    const allItems = await db.getAll(storeName);
    return allItems.length > 0;
  }