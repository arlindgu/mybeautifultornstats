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
      const id = await db.profile.add({
        ...data
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