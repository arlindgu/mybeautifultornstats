import { initDatabase } from "@/lib/initDatabase";
import { getCurrentTimestamp } from "@/lib/utils";

export async function useBounties() {

    initDatabase();

    const currentTimestamp = getCurrentTimestamp();
    console.log("Current Timestamp: ", currentTimestamp);

        (async () => {
            const rest = await fetch("/api/torn/get-user-logs?category=157&to=" + currentTimestamp);
            const data = await rest.json();
            console.log(data);
        })();


    return true
}
