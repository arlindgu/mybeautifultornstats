import { createDb, addObjectStores, getDb } from "@/lib/db";
import { useState } from "react";
import { toast } from "sonner";

const dbName = "MBTS";
const storeNames = [
  "profile",
  "battlestats",
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