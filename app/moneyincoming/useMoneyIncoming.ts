// useMoneyIncoming.ts
import { useState, useEffect } from "react";
import {
  ApiEndpoints,
  getProfile,
  getFirstLogs,
  getMoneyIncoming,
} from "@/lib/apicalls";
import { saveData } from "@/lib/db";
import { openDB } from "idb";

export function useMoneyIncoming() {
  const [progress, setProgress] = useState(0);

  const fetchMoneyIncoming = async () => {

    const db = await openDB("mbts-db", 1);
    const all = await db.getAll("Money Incoming");

    if (all.length > 0) {
      const uniqueLogs = [...new Set(all.map((entry: any) => entry.log))];
      console.log(uniqueLogs.length - 1);
      console.log(all);
      return;
    }

    const api_key = localStorage.getItem("api_key");
    const entries = [] as any[];
    if (!api_key) return;

    let result = await getProfile(ApiEndpoints.profile, api_key);
    let dateOnly = result["signup"].split(" ")[0];
    const oldestTimestamp = new Date(dateOnly).getTime() / 1000;

    result = await getFirstLogs(ApiEndpoints.firstLog, api_key);
    let firstLogEntry = Object.values(result.log ?? {})[0] as {
      timestamp: number;
    };

    result = await getMoneyIncoming(api_key, firstLogEntry.timestamp);
    entries.push(...Object.values(result.log ?? {}));


    while (Object.keys(result.log ?? {}).length !== 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      result = await getMoneyIncoming(
        api_key,
        entries[entries.length - 1].timestamp
      );
      console.log(entries[entries.length - 1].timestamp);
      entries.push(...Object.values(result.log ?? {}));

      setProgress(
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
  };

  return { progress, fetchMoneyIncoming };
}