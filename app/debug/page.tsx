"use client"
import { openDB } from "idb";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DebugPage() {


    useEffect(() => {
        (async () => {

            const db = await openDB("mbts-db", 1);
            const all = await db.getAll("Money Incoming");
            
            const jobPays = Object.values(all).filter((entry: any) => entry.log === 6220);
            toast(jobPays);

            const uniqueLogs = [...new Set(all.map((entry: any) => entry.log))];
            toast(uniqueLogs.length - 1);

        }
        )();

    }, []);
    


    return (
        <div className="flex items-center justify-center">
        <a className="text-xl">THIS IS A DEBUG PAGE</a>
        </div>
    );
}