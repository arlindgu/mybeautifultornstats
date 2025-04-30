import { useEffect, useState } from "react";
import { getFromUser } from "@/lib/apicalls";
import { saveData, getDb } from "@/lib/db";

export function useProfile() {
    const [username, setUsername] = useState<string | null>(null);
  
    useEffect(() => {
      (async () => {
        const key = localStorage.getItem("apiKey");
        if (!key) return;

        const db = await getDb("MBTS");
        if (!db || !db.objectStoreNames.contains("profile")) return;
        const result = await db.get("profile", "profile");
        if (result) {
          setUsername(result.name);
          console.log("LOADED FROM IDB");
          return;
        } else {
          const profile = await getFromUser(key, "profile");
          setUsername(profile["name"]);
          console.log("API REQUEST MADE");
          saveData("MBTS", "profile", profile, "profile");
        }
      }

    )();
    }, []);
  
    return {username};
}