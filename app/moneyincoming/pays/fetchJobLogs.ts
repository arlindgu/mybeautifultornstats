"use client";
import { openDB }   from "idb";
import { createDb, saveData, addObjectStores } from "@/lib/db";
import { useEffect, useState } from "react";
import { getLogs, checkNewLogs } from "@/lib/apicalls";

export function fetchJobLogs() {

    // 6220 6221

    const [jobPays, setJobPays] = useState<any[]>([]);

    const [companyPays, setCompanyPays] = useState<any[]>([]);

    useEffect(() => {
        (async () => {

            const apiKey = localStorage.getItem("api_key");
            if (!apiKey) return;

            createDb("jobLogs")
            addObjectStores("jobLogs", ["jobLogs"]);

            const db = await openDB("jobLogs");
            const filteredLogs = await db.getAll("jobLogs");

            const firstTimeStamp = filteredLogs.sort((a: any, b: any) => b.timestamp - a.timestamp);
            console.log("First timestamp:", firstTimeStamp[0].timestamp);

            const resultNew = await checkNewLogs(apiKey, firstTimeStamp[0].timestamp, 147);

            if (resultNew.log && Object.keys(resultNew.log).length !== 0) {
                console.log("No new logs found:");
                return;
            } else {
                const currentTimestamp = Math.floor(Date.now() / 1000);

            // current timestamp for first logs
            let resultJobs = await getLogs(apiKey, 147, currentTimestamp);
            console.log(resultJobs)
            const jobEntries = Object.entries(resultJobs.log ?? {});

            while (resultJobs.log && Object.keys(resultJobs.log).length !== 0) {
                const [lastKey, lastValue] = jobEntries[jobEntries.length - 1] as [string, { timestamp: number }];
                console.log("Last timestamp:", lastValue.timestamp);
                resultJobs = await getLogs(apiKey, 147, lastValue.timestamp);
                jobEntries.push(...Object.entries(resultJobs.log ?? {}));
                await new Promise((resolve) => setTimeout(resolve, 1200));
                for (const [key, value] of jobEntries) {
                    saveData("jobLogs", "jobLogs", value, key);
                }
            }

            console.log("finished")

        }
        })();
    })

    
    // const { data, isLoading, error } = useQuery("pays", fetchPays);
    // const pays = data || [];
    // const totalPays = pays.reduce((acc, pay) => acc + pay.amount, 0);
    // const totalPaysCount = pays.length;
    // const totalPaysByLog = pays.reduce((acc, pay) => {
    //     acc[pay.log] = (acc[pay.log] || 0) + pay.amount;
    //     return acc;
    // }, {});
    // return { pays, totalPays, totalPaysCount, totalPaysByLog };
}