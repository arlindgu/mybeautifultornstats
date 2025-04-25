"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchJobLogs } from "./fetchJobLogs";
import useJobLogs from "./useJobLogs";
import { fetchLogsFromCategory } from "@/hooks/fetchLogsFromCategory";

export default function PaysPage() {

    const apiKey = localStorage.getItem("api_key");
    if (!apiKey) {
        console.log("No API key found in local storage.");
        return;
    }
    fetchLogsFromCategory(apiKey, 147);

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