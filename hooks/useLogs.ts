import { getProfile, getFirstLogs, getLogs, ApiEndpoints } from "@/lib/apicalls";
import { useState, useEffect, useRef } from "react";
import { saveData, getDb } from "@/lib/db";

export function useLogs() {
    const [progress, setProgress] = useState<number>(0);
    const [timestamps, setTimestamps] = useState<{
        oldest: number;
        newest: number;
        current: number;
      }>({
        oldest: 0,
        newest: 0,
        current: 0,
      });

      const entriesRef = useRef<any[]>([]);



      // first log
      useEffect(() => {
        (async () => {
            console.log("useFirstLogs");
          const key = localStorage.getItem("api_key");
            if (!key) return;
        
        const result = await getFirstLogs(ApiEndpoints.firstLog, key)
        const firstLogEntry = Object.values(result.log ?? {})[0] as {
          timestamp: number;
          [key: string]: any;
        };
        const newestTimestamp = firstLogEntry.timestamp;
        setTimestamps(prev => ({ ...prev, newest: newestTimestamp }));

        
      })();
    }, []);

      useEffect(() => {
        (async () => {
            console.log("useLastLogs");
          const key = localStorage.getItem("api_key");
            if (!key) return;
        
        const result = await getProfile(ApiEndpoints.profile, key)
        const signUpDate = result["signup"];
        const onlyDate = signUpDate.split(" ")[0];
        const oldestTimestamp = new Date(onlyDate).getTime() / 1000;
        setTimestamps(prev => ({ ...prev, oldest: oldestTimestamp }));
        })();
      }, []);

      useEffect(() => {
        (async () => {
            console.log("fetchLogs");
            const key = localStorage.getItem("api_key");
            if (!key) return;

            let result = await getLogs(timestamps.current, key)
            console.log(result)
            entriesRef.current = Object.values(result.log || {});
            let lastEntry = entriesRef.current[entriesRef.current.length - 1];
            let lastTimestamp = lastEntry.timestamp;
            setTimestamps(prev => ({ ...prev, current: lastTimestamp }));

            while (lastEntry.log != 1 && lastEntry.log != "1") {
                await new Promise(r => setTimeout(r, 1200));
                const newLogs = await getLogs(lastTimestamp, key);
                entriesRef.current.push(...Object.values(newLogs.log || {}));
                lastEntry = entriesRef.current[entriesRef.current.length - 1];
                lastTimestamp = lastEntry.timestamp;
                setTimestamps(prev => ({ ...prev, current: lastTimestamp }));
                console.log(lastTimestamp);
                console.log(lastEntry)
                console.log(entriesRef.current.length)
                setProgress((timestamps.newest - timestamps.current) / (timestamps.newest - timestamps.oldest) * 100);
            }

        })();
      }, []);

    return { progress, timestamps};

}