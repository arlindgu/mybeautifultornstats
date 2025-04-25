"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLogsFromCategory } from "@/hooks/fetchLogsFromCategory";
import { saveData, addObjectStore } from "@/lib/db";
import { useEffect } from "react";
import { openDB } from "idb";

export default function PaysPage() {

    addObjectStore("jobLogs", "jobLogs");

    (async () => {
        const apiKey = localStorage.getItem("api_key");
        if (!apiKey) {
            console.log("No API key found in local storage.");
            return;
        } else {
            const test = await fetchLogsFromCategory(apiKey, 147);
            for (const [key, value] of test) {
                saveData("jobLogs", "jobLogs", value, key);
            }
        }

        const db = await openDB("jobLogs");
        const entries = await db.getAll("jobLogs");
        const filteredEntries = entries.filter((entry) => entry.log === 6220);
        console.log("Filtered Entries:", filteredEntries);

        let total = 0;
        for (const entry of filteredEntries) {
            total += entry.data.pay
        }

        const uniqueJobs: string[] = Array.from(
            new Set(filteredEntries.map((entry) => entry.data.job))
          );
        console.log("Unique Jobs:", uniqueJobs)

        console.log("Total:", total);
        console.log("Entries in jobLogs:", entries);


    })();

    return (
        <main>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-4 grid-rows-2 gap-4">
                    <Card className="col-span-4 row-span-1 row-start-2 h-fit items-center">
                        <CardHeader className="text-center w-full">
                            <CardTitle className="">
                                Pays</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center">
                                <p className="text-2xl font-bold text-white">Total Pays</p>
                                <p className="text-xl font-bold text-zinc-700">Total Pays</p>
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
    }