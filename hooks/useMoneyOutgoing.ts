import {ApiEndpoints, getProfile, getFirstLogs, getMoneyOutgoing} from "@/lib/apicalls"
import { saveData, countDB } from "@/lib/db";

export async function fetchMoneyOutgoing() {
const api_key = "cl8xxMu2j7GkLdKT"
const entries = [] as any[]
let result = await getProfile(ApiEndpoints.profile, api_key)
let dateOnly = result["signup"].split(" ")[0];
const oldestTimestamp = new Date(dateOnly).getTime() / 1000;
console.log(oldestTimestamp)

result = await getFirstLogs(ApiEndpoints.firstLog, api_key)
let firstLogEntry = Object.values(result.log ?? {})[0] as {
    timestamp: number;
}
console.log(firstLogEntry.timestamp)

result = await getMoneyOutgoing(api_key, firstLogEntry.timestamp)
entries.push(...Object.values(result.log ?? {}));

while (Object.keys(result.log ?? {}).length !== 0) {
    result = await getMoneyOutgoing(api_key, entries[entries.length - 1].timestamp)
    entries.push(...Object.values(result.log ?? {}));
    console.log((firstLogEntry.timestamp - entries[entries.length - 1].timestamp) / (firstLogEntry.timestamp - oldestTimestamp) )
    for (const [key, value] of Object.entries(result.log ?? {})) {
        console.log(key)
        saveData('Money Outgoing', value, key);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
}  

    const dbCount = await countDB("Money Outgoing");
    console.log(dbCount)


// setProgress((timestamps.newest - timestamps.current) / (timestamps.newest - timestamps.oldest) * 100);
  };

  fetchMoneyOutgoing()