"use client";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import hash from 'hash-sum';

export function useBattleStats() {

  const iDBBattleStats = useLiveQuery(async () => {
    const all = await db.battlestats.toArray();
    return all.length ? all[all.length - 1] : null;
  });
  const [toastMessage, setToastMessage] = useState<string | null>("Checking for updates");
  const [stats, setStats] = useState<{
    strength: number | null,
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
    strengthInfo: string[] | null,
    defenseInfo: string[] | null,
    speedInfo: string[] | null,
    dexterityInfo: string[] | null
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
    const loading = iDBBattleStats === undefined;
    if (loading) {
      setToastMessage("Waiting for iDB");
      return;
    }

    (async () => {
      const res = await fetch('/api/torn/get-user-data?selection=battlestats');
      const APIBattleStats = await res.json();

      if (iDBBattleStats === null) {
        await db.battlestats.add({ ...APIBattleStats });
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
        setToastMessage("Keine iDB-Werte, API geladen und gespeichert");
        return;
      }

      const { id, ...iDBStripped } = iDBBattleStats;
      if (hash(iDBStripped) === hash(APIBattleStats)) {
        setStatsModifiers({
          strengthModifier: iDBBattleStats?.strength_modifier ?? 0,
          defenseModifier: iDBBattleStats?.defense_modifier ?? 0,
          speedModifier: iDBBattleStats?.speed_modifier ?? 0,
          dexterityModifier: iDBBattleStats?.dexterity_modifier ?? 0
        });    
        setStats({
          strength: iDBBattleStats?.strength ?? 0,
          defense: iDBBattleStats?.defense ?? 0,
          speed: iDBBattleStats?.speed ?? 0,
          dexterity: iDBBattleStats?.dexterity ?? 0
        });
        setStatsInfo({
          strengthInfo: iDBBattleStats?.strength_info ?? [],
          defenseInfo: iDBBattleStats?.defense_info ?? [],
          speedInfo: iDBBattleStats?.speed_info ?? [],
          dexterityInfo: iDBBattleStats?.dexterity_info ?? []
        });
        setToastMessage("API & iDB are the same, using iDB values");
      } else {
        await db.battlestats.add({ ...APIBattleStats });
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
  }, [iDBBattleStats]);
  return { stats, statsInfo, statsModifier, toastMessage };
}