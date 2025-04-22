"use client";

import { useEffect, useState } from "react";
import { getBattleStats, ApiEndpoints } from "@/lib/apicalls";
import { saveData, getDb } from "@/lib/db";

export function useBattleStats() {
    const [stats, setStats] = useState<{
        strength: string | null,
        defence: string | null,
        speed: string | null,
        dexterity: string | null
      }>({
        strength: null,
        defence: null,
        speed: null,
        dexterity: null
      });


    useEffect(() => {
        async function init() {
          const key = localStorage.getItem("api_key");
          if (!key) return;
  
          const db = await getDb();
          if (!db || !db.objectStoreNames.contains("battlestats")) return;
          const result = await db.get("battlestats", "battlestats");
          if (result) {
            setStats(result.name);
            console.log("LOADED FROM IDB");
            return;
          } else {
            const battlestats = await getBattleStats(ApiEndpoints.battlestats, key);
            setStats(battlestats["player_id"]);
            console.log("API REQUEST MADE");
            saveData("battlestats", battlestats, "battlestats");
          }
        }
  
        init();
      }, []);
  
    useEffect(() => {
      async function init() {
        const key = localStorage.getItem("api_key");
        if (!key) return;

        const db = await getDb();
        if (!db || !db.objectStoreNames.contains("battlestats")) return;
        const result = await db.get("battlestats", "battlestats");
        if (result) {
          setStats(result.name);
          console.log("LOADED FROM IDB");
          return;
        } else {
          const battlestats = await getBattleStats(ApiEndpoints.battlestats, key);
          setUsername(battlestats["name"]);
          console.log("API REQUEST MADE");
          saveData("battlestats", battlestats, "battlestats");
        }
      }

      init();
    }, []);
  
    return {username, player_id};
}