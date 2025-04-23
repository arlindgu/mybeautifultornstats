import {
  ApiEndpoints,
  getProfile,
  getFirstLogs,
  getMoneyIncoming,
} from "@/lib/apicalls";
import { saveData, countDB } from "@/lib/db";
import { openDB } from "idb";

export async function fetchMoneyIncoming() {
  const api_key = "cl8xxMu2j7GkLdKT";
  const entries = [] as any[];
  let result = await getProfile(ApiEndpoints.profile, api_key);
  let dateOnly = result["signup"].split(" ")[0];
  const oldestTimestamp = new Date(dateOnly).getTime() / 1000;
  console.log(oldestTimestamp);

  result = await getFirstLogs(ApiEndpoints.firstLog, api_key);
  let firstLogEntry = Object.values(result.log ?? {})[0] as {
    timestamp: number;
  };
  console.log(firstLogEntry.timestamp);

  result = await getMoneyIncoming(api_key, firstLogEntry.timestamp);
  entries.push(...Object.values(result.log ?? {}));

  while (Object.keys(result.log ?? {}).length !== 0) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    result = await getMoneyIncoming(
      api_key,
      entries[entries.length - 1].timestamp
    );
    entries.push(...Object.values(result.log ?? {}));

    console.log(
      ((firstLogEntry.timestamp - entries[entries.length - 1].timestamp) /
        (firstLogEntry.timestamp - oldestTimestamp)) *
        100
    );

    for (const [key, value] of Object.entries(result.log ?? {})) {
      saveData(
        "Money Incoming",
        JSON.parse(typeof value === "string" ? value : JSON.stringify(value)),
        key
      );
    }
  }

  console.log("we finished");
  // setProgress((timestamps.newest - timestamps.current) / (timestamps.newest - timestamps.oldest) * 100);
}

fetchMoneyIncoming();

export async function getFilteredLogsByType(logId: number) {
  const db = await openDB("mbts-db", 1);
  const all = await db.getAll("Money Outgoing");

  const filtered = all.filter((entry) => entry.log === logId);
  return filtered;
}


