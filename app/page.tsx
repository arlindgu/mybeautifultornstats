"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";
import {useRouter } from "next/navigation";


const tornErrorCodes: Record<number, string> = {
  0: "Unknown error",
  1: "Key is empty",
  2: "Incorrect Key",
  3: "Wrong type",
  4: "Wrong fields",
  5: "Too many requests",
  6: "Incorrect ID",
  7: "Incorrect ID-entity relation",
  8: "IP block",
  9: "API disabled",
  10: "Key owner is in federal jail",
  11: "Key change error",
  12: "Key read error",
  13: "Key temporarily disabled due to inactivity",
  14: "Daily read limit reached",
  15: "Temporary error",
  16: "Key access level too low",
  17: "Backend error occurred",
  18: "API key paused by owner",
  19: "Must migrate to crimes 2.0",
  20: "Race not yet finished",
  21: "Incorrect category",
  22: "Selection only in API v1",
  23: "Selection only in API v2",
  24: "Closed temporarily",
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedKey = localStorage.getItem("api_key");
    if (storedKey) {
      (document.getElementById("api_key") as HTMLInputElement).value = storedKey;
      checkApiKey();
    }
  }, []);



  function checkApiKey() {
    const apiKey = document.getElementById("api_key") as HTMLInputElement;
    const apiKeyValue = apiKey.value;
    localStorage.setItem("api_key", apiKeyValue);

    fetch(`https://api.torn.com/user/?selections=crimes&key=${apiKeyValue}`)
      .then(res => {
        console.log(res)
        return res.json() 
      })
      .then(data => {
        if (data.error) {
          const msg = tornErrorCodes[data.error.code] || "Unbekannter Fehler";
          document.getElementById("api_alert")!.classList.remove("hidden");
          document.getElementById("api_alert_description")!.innerHTML = msg;
          return;
        }



        document.getElementById("api_alert")!.classList.add("hidden");
        router.push("/dashboard");
      })
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center w-full" >
          <h1 className="text-6xl font-bold">MBTS</h1>
          <p className="text-lg text-gray-400 mt-2">My Beautiful Torn Stats</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <Input id="api_key" placeholder="API Key"></Input>

          <Alert className="hidden" id="api_alert" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription id="api_alert_description">
              123
            </AlertDescription>
          </Alert>

          <Button onClick={checkApiKey} className="w-1/3">Login</Button>
        </div>

        <a className="font-[family-name:var(--font-geist-mono)] text-sm">We <b>DO NOT</b> store your API-Key
        </a>
      </main>
    </div>
  );
}
