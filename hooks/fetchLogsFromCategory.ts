"use client";
import { openDB }   from "idb";
import { createDb, saveData, addObjectStores } from "@/lib/db";
import { useEffect, useState } from "react";
import { getLogs, getFromUser } from "@/lib/apicalls";


export async function fetchLogsFromCategory (apiKey: string, category: number) {

    const result = await getFromUser(apiKey, "profile")
    const oldestTimestamp = result.log[0].signup;
    console.log("Oldest Timestamp:", oldestTimestamp);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    let fetchedLogs = await getLogs(apiKey, category, currentTimestamp);
    const entriesLogs = Object.entries(fetchedLogs.log) as [string, { [key: string]: any }][];
    entriesLogs.sort(([, a],[, b]) => a.timestamp - b.timestamp);
    console.log(entriesLogs[0][1].timestamp)

    while (Object.entries(fetchedLogs.log).length !== 0) {
        fetchedLogs = await getLogs(apiKey, category, entriesLogs[0][1].timestamp);
        console.log("Fetched logs:", fetchedLogs.log);
        entriesLogs.push(...Object.entries(fetchedLogs.log) as [string, { [key: string]: any }][]);
        entriesLogs.sort(([, a],[, b]) => a.timestamp - b.timestamp);
        console.log(entriesLogs[0][1].timestamp)
        console.log("Fetched logs:", entriesLogs.length);
        
        await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    console.log("finished", entriesLogs.length);

return entriesLogs;
} 