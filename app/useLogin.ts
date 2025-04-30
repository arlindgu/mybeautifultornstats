import { getFromUser } from '@/lib/apicalls';
import { useState, useEffect } from 'react';


export function useLogin() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/get-api-key");
        const data = await res.json();

        if (data.apiKey) {
          setApiKey(data.apiKey);
        }
      } catch (err) {
        console.error("Fehler beim Holen des API-Keys aus den Cookies:", err);
      }
    })();
  }, []);

  return { apiKey, setApiKey };
}

export async function checkApiKey() {
  const apiKey = (document.getElementById("apiKey") as HTMLInputElement).value;
  const response = await getFromUser(apiKey, "profile");

  if (response["error"]) {
    console.log("Error:", response);
    document.getElementById("api_alert")!.classList.remove("hidden");
    document.getElementById("api_alert_description")!.innerHTML = response["error"]["error"];
    return false;
  } else {
    // Lokalen Storage setzen
    localStorage.setItem("apiKey", apiKey);

    // Cookie setzen via POST-Request
    await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey }),
    });

    document.getElementById("api_alert")!.classList.add("hidden");
    console.log("No Error:", response);
    return true;
  }
}

