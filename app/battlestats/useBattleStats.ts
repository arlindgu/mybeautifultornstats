"use client";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/apicalls";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

export function useBattleStats() {
    const [toastMessage, setToastMessage] = useState<string | null>("Checking for updates...");
    
    const [stats, setStats] = useState<{
        strength: number  | null,
        defense: number | null,
        speed: number | null,
        dexterity: number | null
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
        strengthModifier: number | null,
        defenseModifier: number | null,
        speedModifier: number | null,
        dexterityModifier: number | null
      }>({
        strengthModifier: null,
        defenseModifier: null,
        speedModifier: null,
        dexterityModifier: null
      });


    useEffect(() => {
        (async () => {
          const apiKey = await getCookie("apiKey")
          console.log(apiKey)

          const iDBBattleStats = useLiveQuery(() => db.battlestats.toCollection().first());
          const res = await fetch('/api/torn/get-user-data?selection=battlestats');
          const APIBattleStats = await res.json();
          console.log(APIBattleStats)
          const BattleStatsAPI = await db.battlestats.add({APIBattleStats});

          if (isSame) {
            setStatsModifiers({
              strengthModifier: iDBBattleStats["strength_modifier"],
              defenseModifier: iDBBattleStats["defense_modifier"],
              speedModifier: iDBBattleStats["speed_modifier"],
              dexterityModifier: iDBBattleStats["dexterity_modifier"]
            });
            setStats({
              strength: iDBBattleStats["strength"],
              defense: iDBBattleStats["defense"],
              speed: iDBBattleStats["speed"],
              dexterity: iDBBattleStats["dexterity"]
            });
            setStatsInfo({
              strengthInfo: iDBBattleStats["strength_info"],
              defenseInfo: iDBBattleStats["defense_info"],
              speedInfo: iDBBattleStats["speed_info"],
              dexterityInfo: iDBBattleStats["dexterity_info"]
            });
            setToastMessage("API & iDB are the same, using iDB values");
          } else {
            setStatsModifiers({
              strengthModifier: APIBattleStats["strength_modifier"],
              defenseModifier: APIBattleStats["defense_modifier"],
              speedModifier: APIBattleStats["speed_modifier"],
              dexterityModifier: APIBattleStats["dexterity_modifier"]
            });
            setStats({
              strength: APIBattleStats["strength"],
              defense: APIBattleStats["defense"],
              speed: APIBattleStats["speed"],
              dexterity: APIBattleStats["dexterity"]
            });
            setStatsInfo({
              strengthInfo: APIBattleStats["strength_info"],
              defenseInfo: APIBattleStats["defense_info"],
              speedInfo: APIBattleStats["speed_info"],
              dexterityInfo: APIBattleStats["dexterity_info"]
            });
            setToastMessage("API & iDB are NOT same, updating iDB values, using API values");
        }
  
    })();
      }, [apiKey]);
  
    return {stats, statsInfo, statsModifier, toastMessage};
}