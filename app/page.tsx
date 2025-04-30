"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkApiKey, useLogin } from "@/hooks/useLogin"
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { initDatabase } from "@/lib/initDatabase";
import { use, useEffect } from "react";
import { init } from "next/dist/compiled/webpack/webpack";
import { useState } from "react";

export default function Home() {

  const router = useRouter()
  async function handleLogin() {

    document.getElementById("login-button")!.setAttribute("disabled", "true");
    document.getElementById("loader")!.classList.remove("hidden");
    document.getElementById("btn-text")!.classList.add("hidden");

    const success = await checkApiKey();
    if (success) {
      router.push("/welcome");
      toast("Event has been created.")
    } else {
      document.getElementById("login-button")!.removeAttribute("disabled");
      document.getElementById("loader")!.classList.add("hidden");
      document.getElementById("btn-text")!.classList.remove("hidden");
    }
  }

  const { apiKey, setApiKey } = useLogin();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center w-full" >
          <h1 className="text-6xl font-bold">MBTS</h1>
          <p className="text-lg text-gray-400 mt-2">My Beautiful Torn Stats</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <Input
            id="apiKey"
            placeholder="API Key"
            value={apiKey || ""}
            onChange={(e) => setApiKey(e.target.value)}
          ></Input>

          <Alert className="hidden" id="api_alert" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription id="api_alert_description">
              123
            </AlertDescription>
          </Alert>

          <Button disabled={false} id="login-button" onClick={handleLogin} className="w-1/3">
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
