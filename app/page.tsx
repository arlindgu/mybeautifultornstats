"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { useLogin } from "./useLogin";
import { toast } from "sonner";

export default function Home() {

  const [inputApiKey, setInputApiKey] = useState<string>("");
  const { login, getApiKey, message } = useLogin();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    toast(message)
  }, [message]);

  useEffect(() => {
    (async () => {
     setInputApiKey(await getApiKey("ApiKey"));
    })();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center w-full" >
          <h1 className="text-6xl font-bold">MBTS</h1>
          <p className="text-lg text-gray-400 mt-2">My Beautiful Torn Stats</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <Input
            id="apiKey"
            placeholder="API Key"
            value={inputApiKey || ""} 
            onChange={(e) => setInputApiKey(e.target.value)}
          ></Input>

          <Alert className="hidden" id="api_alert" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription id="api_alert_description">
              123
            </AlertDescription>
          </Alert>

          <Button disabled={false} id="login-button" onClick={() => login(inputApiKey)} className="w-1/3">
            <Loader2 id="loader" className="animate-spin hidden" />
            <span id="btn-text">Login</span>
          </Button>

        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full">
        <a className="font-[family-name:var(--font-geist-mono)] text-sm">We <b>DO NOT</b> store your API-Key</a>
        <a href="/infodata" className="underline text-sm">How will my data be stored?</a>
        </div>
      </main>
    </div>
  );
}
