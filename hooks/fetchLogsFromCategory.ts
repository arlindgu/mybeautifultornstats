"use client";
import { openDB }   from "idb";
import { createDb, saveData, addObjectStores } from "@/lib/db";
import { useEffect, useState } from "react";
import { getLogs, checkNewLogs } from "@/lib/apicalls";


export async function fetchLogsFromCategory (apiKey: string, category: number,) {

    const currentTimestamp = Math.floor(Date.now() / 1000);
    let fetchedLogs = await getLogs(apiKey, category, currentTimestamp);
    const entriesLogs = Object.entries(fetchedLogs.log) as [string, { [key: string]: any }][];
    entriesLogs.sort(([, a],[, b]) => a.timestamp - b.timestamp);
    console.log(entriesLogs)




} 


export function fetchLogsFromCategory123(logname: string, dbName: string, objectStorename: string, category: number) {
    useEffect(() => {
        (async () => {
            console.log("Fetching logs from category:", logname, dbName, objectStorename, category);

            /*
            const apiKey = localStorage.getItem("api_key");
            if (!apiKey) {
                console.log("No API key found in local storage.");
                return;
            }
            */

            createDb(dbName)
            console.log("Creating database:", dbName);
            addObjectStores(objectStorename, [objectStorename]);
            console.log("Adding object store:", objectStorename);

            const db = await openDB(dbName);
            console.log("Opening database:", dbName);
            const existingLogs = await db.getAll(objectStorename);
            if (existingLogs.length === 0) {
                console.log(logname ,"No logs found in the object store.");
                const currentTimestamp = Math.floor(Date.now() / 1000);
    
                // current timestamp for first logs
                let resultJobs = await getLogs(apiKey, category, currentTimestamp);
                console.log(resultJobs)
                const jobEntries = Object.entries(resultJobs.log ?? {});
    
                while (resultJobs.log && Object.keys(resultJobs.log).length !== 0) {
                    const [lastKey, lastValue] = jobEntries[jobEntries.length - 1] as [string, { timestamp: number }];
                    console.log("Last timestamp:", lastValue.timestamp);
                    resultJobs = await getLogs(apiKey, category, lastValue.timestamp);
                    jobEntries.push(...Object.entries(resultJobs.log ?? {}));
                    await new Promise((resolve) => setTimeout(resolve, 1200));
                    for (const [key, value] of jobEntries) {
                        saveData(dbName, objectStorename, value, key);
                    }
                }

            } else {
                const filteredLogs = await db.getAll(objectStorename);
                const firstTimeStamp = filteredLogs.sort((a: any, b: any) => b.timestamp - a.timestamp);
                console.log(logname, "First timestamp:", firstTimeStamp[0].timestamp);
                const resultNew = await checkNewLogs(apiKey, firstTimeStamp[0].timestamp, category);

                if (resultNew.log && Object.keys(resultNew.log).length !== 0) {
                    console.log("No new logs found:");
                    return;
                } else {
                
                const currentTimestamp = Math.floor(Date.now() / 1000);
    
                // current timestamp for first logs
                let resultJobs = await getLogs(apiKey, category, currentTimestamp);
                console.log(resultJobs)
                const jobEntries = Object.entries(resultJobs.log ?? {});
    
                while (resultJobs.log && Object.keys(resultJobs.log).length !== 0) {
                    const [lastKey, lastValue] = jobEntries[jobEntries.length - 1] as [string, { timestamp: number }];
                    console.log("Last timestamp:", lastValue.timestamp);
                    resultJobs = await getLogs(apiKey, category, lastValue.timestamp);
                    jobEntries.push(...Object.entries(resultJobs.log ?? {}));
                    await new Promise((resolve) => setTimeout(resolve, 1200));
                    for (const [key, value] of jobEntries) {
                        saveData(dbName, objectStorename, value, key);
                    }
                }

            } 

            console.log("finished")
            

            



        }
        })();
    })

    

}