"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {

    const router = useRouter();
    return (
        <header className="absolute w-screen flex flex-rco gap-4 justify-between p-5 bg-zinc-900 text-white outline-1 outline-zinc-800">
            <div className="flex flex-col">
            <span className="font-extrabold text-2xl">MBTS</span>
            <span className="text-xs font-extralight">My Beautiful Torn Stats</span>
            </div>
            <div className="flex flex-row gap-4 w-full justify-center items-center">
            <Button variant="outline" onClick={() => router.push("/battlestats")}>Battlestats</Button>
            </div>
        </header>

    );
}