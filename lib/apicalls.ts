export const ApiEndpoints = {
  basic: "https://api.torn.com/v2/user?selections=basic&striptags=false",
  battlestats: "https://api.torn.com/v2/user?selections=battlestats&striptags=false",
  profile: "https://api.torn.com/v2/user?selections=profile&striptags=false",
  firstLog: "https://api.torn.com/v2/user?selections=log&striptags=false",
}

export async function getBasic (url: string = ApiEndpoints.basic, apikey: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
  });

  const data = await res.json()
  return data;
}

export async function getProfile (url: string = ApiEndpoints.profile, apikey: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
  });

  const data = await res.json()
  return data;
}

export async function getBattleStats (url: string = ApiEndpoints.battlestats, apikey: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
    
  });

  const data = await res.json()
  return data;
}

export async function getFirstLogs(url: string = ApiEndpoints.firstLog, apikey: string) {
  const res = await fetch(url, {
      method: "GET",
      headers: {
          Authorization: `ApiKey ${apikey}`,
      }
  });
  let data = await res.json()
  return data;
}
export async function getLogs(to: number, apikey: string) {
  const res = await fetch(`https://api.torn.com/v2/user?selections=log&to=${to}&striptags=false`, {
      method: "GET",
      headers: {
          Authorization: `ApiKey ${apikey}`,
      }
  });
  let data = await res.json()
  return data;
}

export async function getAllLogs(url: string = ApiEndpoints.firstLog, apikey: string) {
  let result = await getFirstLogs(ApiEndpoints.firstLog, apikey);
  let entries: any[] = Object.values(result.log || {});
  let lastEntry = entries[entries.length - 1];
  console.log(lastEntry)
  let lastTimestamp = lastEntry.timestamp;
  console.log(lastTimestamp)

  while (lastEntry.log != 1 || lastEntry.log != "1") {
      const newLogs = await getLogs(lastTimestamp, apikey);
      entries.push(...Object.values(newLogs.log || {}));
      lastEntry = entries[entries.length - 1];
      lastTimestamp = lastEntry.timestamp;
      console.log(lastTimestamp);
      console.log(lastEntry)
      console.log(entries.length)
  }
  return entries;

}