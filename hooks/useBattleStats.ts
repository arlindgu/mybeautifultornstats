"use client";

import { useEffect, useState } from "react";
import { getBattleStats, ApiEndpoints } from "@/lib/apicalls";
import { saveData, getDb } from "@/lib/db";

export function useBattleStats() {
    const [stats, setStats] = useState<{
        strength: string | null,
        defense: string | null,
        speed: string | null,
        dexterity: string | null
      }>({
        strength: null,
        defense: null,
        speed: null,
        dexterity: null
      });

      const [statsInfo, setStatsInfo] = useState<{
        strengthInfo: string | null,
        defenseInfo: string | null,
        speedInfo: string | null,
        dexterityInfo: string | null
      }>({
        strengthInfo: null,
        defenseInfo: null,
        speedInfo: null,
        dexterityInfo: null
      });

      const [statsModifier, setStatsModifiers] = useState<{
        strengthModifier: string | null,
        defenseModifier: string | null,
        speedModifier: string | null,
        dexterityModifier: string | null
      }>({
        strengthModifier: null,
        defenseModifier: null,
        speedModifier: null,
        dexterityModifier: null
      });


    useEffect(() => {
        async function init() {
          const key = localStorage.getItem("api_key");
          if (!key) return;
            
          const db = await getDb();
          if (!db || !db.objectStoreNames.contains("battlestats")) return;
          const result = await db.get("battlestats", "battlestats");
          if (result) {
            setStatsModifiers({
              strengthModifier: result["strength_modifier"],
              defenseModifier: result["defense_modifier"],
              speedModifier: result["speed_modifier"],
              dexterityModifier: result["dexterity_modifier"]
            });
            setStats({
              strength: result["strength"],
              defense: result["defense"],
              speed: result["speed"],
              dexterity: result["dexterity"]
            });
            setStatsInfo({
              strengthInfo: result["strength_info"],
              defenseInfo: result["defense_info"],
              speedInfo: result["speed_info"],
              dexterityInfo: result["dexterity_info"]
            });
            console.log("LOADED FROM IDB");
            return;
          } else {
            const battlestats = await getBattleStats(ApiEndpoints.battlestats, key);
            setStatsModifiers({
              strengthModifier: result["strength_modifier"],
              defenseModifier: result["defense_modifier"],
              speedModifier: result["speed_modifier"],
              dexterityModifier: result["dexterity_modifier"]
            });
            setStats({
              strength: battlestats["strength"],
              defense: battlestats["defense"],
              speed: battlestats["speed"],
              dexterity: battlestats["dexterity"]
            });
            setStatsInfo({
              strengthInfo: result["strength_info"],
              defenseInfo: result["defense_info"],
              speedInfo: result["speed_info"],
              dexterityInfo: result["dexterity_info"]
            });
            console.log("API REQUEST MADE");
            saveData("battlestats", battlestats, "battlestats");
          }
        }
  
        init();
      }, []);
  
    return {stats, statsInfo, statsModifier};
}