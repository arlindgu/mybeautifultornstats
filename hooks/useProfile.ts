"use client";

import { useEffect, useState } from "react";
import { getProfile, ApiEndpoints } from "@/lib/apicalls";
import { saveData, getDb } from "@/lib/db";

export function useProfile() {
    const [username, setUsername] = useState<string | null>(null);
    const [player_id, setPlayer_id] = useState<string | null>(null);


    useEffect(() => {
        async function init() {
          const key = localStorage.getItem("api_key");
          if (!key) return;
  
          const db = await getDb();
          if (!db || !db.objectStoreNames.contains("profile")) return;
          const result = await db.get("profile", "profile");
          if (result) {
            setPlayer_id(result.name);
            console.log("LOADED FROM IDB");
            return;
          } else {
            const profile = await getProfile(ApiEndpoints.profile, key);
            setPlayer_id(profile["player_id"]);
            console.log("API REQUEST MADE");
            saveData("profile", profile, "profile");
          }
        }
  
        init();
      }, []);
  
    useEffect(() => {
      async function init() {
        const key = localStorage.getItem("api_key");
        if (!key) return;

        const db = await getDb();
        if (!db || !db.objectStoreNames.contains("profile")) return;
        const result = await db.get("profile", "profile");
        if (result) {
          setUsername(result.name);
          console.log("LOADED FROM IDB");
          return;
        } else {
          const profile = await getProfile(ApiEndpoints.profile, key);
          setUsername(profile["name"]);
          console.log("API REQUEST MADE");
          saveData("profile", profile, "profile");
        }
      }

      init();
    }, []);
  
    return {username, player_id};
}