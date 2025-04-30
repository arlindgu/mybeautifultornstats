import { getCurrentTimestamp } from "./utils"

export async function fetchAllLogs() {
    const currentTimestamp = getCurrentTimestamp()
    const apiKey = "cl8xxMu2j7GkLdKT"
    const apiRateLimit = 60
    const CompanyEntries: [string, LogEntry][]
    let jobEntries: [string, LogEntry][]

      


      let ApiJobEntries = await getLogs(apiKey, 147, currentTimestamp)
      jobEntries = (Object.entries(ApiJobEntries.log))
      console.log(jobEntries[jobEntries.length - 1][1].timestamp)
}

export async function saveAllLogs() {

}