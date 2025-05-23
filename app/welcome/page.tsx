"use client";

import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function WelcomePage() {
  const handleDelete = () => {
    localStorage.removeItem("apiKey");
    router.push("/");
  }

  const router = useRouter();
  const { username } = useProfile();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome </h1>
  {username ? (
    <h1 className="text-5xl font-extrabold">{username}</h1>
  ) : (
    <Skeleton className="mt-2 h-12 w-100" />
  )}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm">If you want to continue and enjoy this tool, we need to fetch all the logs ever from your account.</p>
        <p className="text-sm">If you are okay with that, press the button below to start the process. </p>
      </div>
      
      <a href="/infodata" className="underline text-sm">How will my data be stored?</a>
      <p className="text-sm font-bold text-red-400">If you want to chicken out, please press the red button.</p>
      <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row gap-4">
        <Button onClick={() => router.push("/dashboard")}>I agree continue</Button>
        <Button variant="destructive" onClick={() => handleDelete()}>Chicken out!</Button>
      </div>
      </div>

    </div>
  );
}