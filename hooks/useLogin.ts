import { getFromUser } from '@/lib/apicalls';
import { useState, useEffect } from 'react';

export function useLogin() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  useEffect(() => {
    const key = localStorage.getItem("apiKey");
    if (key) {
      setApiKey(key);
    }
  }, []);

  return { apiKey, setApiKey };
}

export async function checkApiKey() {

    const apiKey = (document.getElementById("apiKey") as HTMLInputElement).value;
    let response = await getFromUser(apiKey, "profile");

    if (response["error"]) {
        console.log("Error:" , response);
        document.getElementById("api_alert")!.classList.remove("hidden");
        document.getElementById("api_alert_description")!.innerHTML = response["error"]["error"];
        return false;
    } else {
        localStorage.setItem("apiKey", apiKey);
        document.getElementById("api_alert")!.classList.add("hidden");
        console.log("No Error:", response);
        return true;
    }



}

