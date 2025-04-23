import { openDB } from 'idb';

export default function useTest() {
    
}

export async function normalizeMoneyOutgoing() {
    console.log("started")
  const db = await openDB('mbts-db', 1);
  const keys = await db.getAllKeys('Money Outgoing');
  const values = await Promise.all(keys.map(key => db.get('Money Outgoing', key)));

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[i];
    console.log(i, "of", keys.length)

    // nur JSON-Strings anpassen
    if (typeof value === 'string') {
      const parsed = JSON.parse(value);
      await db.put('Money Outgoing', parsed, key);
    }
  }

  console.log('Alle stringifizierten Werte wurden normalisiert.');



}

export async function checkIf() {
    const db = await openDB('mbts-db', 1);
const value = await db.get('Money Outgoing', '00BnPvPC6fNGSuYnTTJZ');
console.log(typeof value); // sollte 'object' sein, nicht 'string'
console.log(value);
  }

export async function getSortedMoneyOutgoing() {
  const db = await openDB('mbts-db', 1);

  const keys = await db.getAllKeys('Money Outgoing');
  const values = await Promise.all(keys.map(key => db.get('Money Outgoing', key)));

  const entries = keys.map((key, i) => ({
    key,
    ...values[i] // Objekt direkt, kein parse nötig
  }));

  // sortieren nach timestamp (älteste zuerst)
  const sorted = entries.sort((a, b) => a.timestamp - b.timestamp);

  console.log(sorted);
  return sorted;
}

export async function getTotalCostByLog(logId: number): Promise<number> {
    console.log("started")
  const db = await openDB('mbts-db', 1);
  const all = await db.getAll('Money Outgoing');

  const filtered = all.filter(entry => entry.log === logId);

  const totalCost = filtered.reduce((sum, entry) => {
    const cost = entry.data?.cost ?? entry.data?.cost_total ?? 0;
    return sum + cost;
  }, 0);

  return totalCost;
}