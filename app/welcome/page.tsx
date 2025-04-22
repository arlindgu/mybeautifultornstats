"use client";

import Header from "@/components/header";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const { username, player_id } = useProfile();


  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome </h1>
        <h1 className="text-5xl font-extrabold"> {username ?? "..."}</h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm">If you want to continue and enjoy this tool, we need to fetch all the logs ever from your account.</p>
        <p className="text-sm">If you are okay with that, press the button below to start the process. </p>
        <p className="text-sm font-extrabold">The process will take several minutes so don't close this window.</p>

      </div>
      <a href="/infodata" className="underline text-sm">How will my data be stored?</a>
      <p className="text-sm font-bold text-red-400">If you want to chicken out, please press the bright red button.</p>
      <div className="flex flex-row gap-4">
        <Button onClick={() => router.push("/dashboard")}>Fetch my logs!</Button>
        <Button variant="destructive" onClick={() => alert("deleting everything and chickening out")}>Chicken out!</Button>
      </div>

    </div>
  );
}