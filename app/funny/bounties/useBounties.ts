import { getCurrentTimestamp } from "@/lib/utils";
import { db } from "@/lib/db";

export async function useBounties() {
    const currentTimestamp = getCurrentTimestamp();
    console.log("Current Timestamp: ", currentTimestamp);

    (async () => {
        const rest = await fetch("/api/torn/get-user-logs?category=157&to=" + currentTimestamp);
        const data = await rest.json();
        console.log("Fetched Data: ", data);
        const rawLogs = data.log;
        const parsedLogs = Object.entries(rawLogs).map(([id, log]) => ({
            id,
            ...(typeof log === "object" && log !== null ? log : {})
        }));
        await db.logs.bulkPut(parsedLogs);
    })();


    return true
}
