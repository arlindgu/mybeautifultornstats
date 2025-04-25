"use client";

import { openDB } from "idb";
import { useEffect } from "react";

export default function useJobLogs() {

    useEffect(() => {
      const fetchAndSum = async () => {
        const db = await openDB("jobLogs");
        const allLogs = await db.getAll("jobLogs");
        // Filtere die Logs, um nur die mit dem Job 6220 zu erhalten
        const job6220Logs = allLogs.filter((entry) => entry.log === 6220);
        console.log("Job 6220 Logs:", job6220Logs);

        let sum = 0
        for (const entry of job6220Logs) {
            sum += entry.data.pay;
        }
        console.log("Summe der Pays für Job 6220:", sum);

        // Beispiel: summiere alle Timestamps
        const totalTimestamp = allLogs.reduce((sum, entry) => {
          return sum + (entry.log.pay || 0);
        }, 0);

        console.log("Summe aller Timestamps:", totalTimestamp);
      };

      fetchAndSum();
    }, []);
    
}