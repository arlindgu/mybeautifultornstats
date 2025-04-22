import { getProfile, getFirstLogs, getLogs, getAllLogs, ApiEndpoints } from "@/lib/apicalls";
import { time } from "console";
import { useState, useEffect } from "react";

export async function fetchLogs() {

    /*
    const [timestamps, setTimestamp] = useState<{
            oldest: number  | null,
            newest: number | null,
            latest: number | null,
          }>({
            oldest: null,
            newest: null,
            latest: null,
          });
          */

    let timestamps = {
        oldest: 0,
        newest: 0,
        latest: 0
    }

    

    const apikey = "cl8xxMu2j7GkLdKT"
    const signUp = await getProfile(ApiEndpoints.profile, apikey);
    timestamps.oldest = Math.floor(new Date(signUp['signup']).getTime() / 1000);
    console.log(timestamps.oldest);

    const firstLog = await getFirstLogs(ApiEndpoints.firstLog, apikey);

    const logData = Object.values(firstLog["log"])[0] as {
        log: number;
        title: string;
        timestamp: number;
        category: string;
        data: any;
        params: any;
      };
      
    timestamps.newest = logData.timestamp;


}
fetchLogs();