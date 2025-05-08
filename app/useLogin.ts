import { db } from "@/lib/db";
import { setCookie, getCookie } from "lib/apicalls"
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const route = useRouter();
  const [message, setMessage] = useState<string>("");

  const login = async (key: string) => {
    await setCookie("apiKey", key); // Setze den Cookie mit dem API-Key
    await setCookie("apiRateLimit", "60"); // Setze den Cookie mit dem API-Key
    
    const test = await checkApiKey();

    if (test) {
      route.push("/dashboard"); // Wenn der API-Key gültig ist, leite zur Dashboard-Seite weiter
      setMessage("Login erfolgreich"); // Setze die Nachricht auf "Login erfolgreich"
      const res = await fetch("/api/torn/get-user-data?selection=profile");
      const data = await res.json();
      const userData = await db.profile.add({
        name: data.name,
        rank: data.rank,
        level: data.level,
        honor: data.honor,
        gender: data.gender,
        property: data.property,
        signup: data.signup,
        awards: data.awards,
        friends: data.friends,
        enemies: data.enemies,
        forum_posts: data.forum_posts,
        karma: data.karma,
        age: data.age,
        role: data.role,
        donator: data.donator,
        player_id: data.player_id,
        property_id: data.property_id,
        revivable: data.revivable,
        profile_image: data.profile_image,
        life: data.life,
        status: data.status,
        job: data.job,
        faction: data.faction,
        married: data.married,
        basicicons: data.basicicons,
        states: data.states,
        last_action: data.last_action,
        competition: data.competition,
      });
    }
    if (test) route.push("/dashboard"); setMessage("Login erfolgreich"); // Setze die Nachricht auf "Login erfolgreich"
  };

  const getApiKey = async (key: string) => {
    const apiKey = await getCookie("apiKey");
    console.log(apiKey) // Hole den Cookie mit dem API-Key
    return apiKey.value;
  }

  const checkApiKey = async () => {
    const response = await fetch("/api/torn/get-user-data?selection=profile")
    const data = await response.json();
    console.log(data);
    if (data.error) return false; else return true;
  }
  return { login, getApiKey, checkApiKey, message };
}