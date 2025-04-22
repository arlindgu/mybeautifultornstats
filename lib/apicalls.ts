export const ApiEndpoints = {
  basic: "https://api.torn.com/v2/user?selections=basic",
  battlestats: "https://api.torn.com/v2/user?selections=battlestats",
  profile: "https://api.torn.com/v2/user?selections=profile"

}

export async function getLogs (url: string = ApiEndpoints.basic, apikey: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
  });
  const data = await res.json()
  return data;
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

export async function getProfile (url: string = ApiEndpoints.battlestats, apikey: string) {
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


/*
const run = async () => {
  let result = await fetchLogs("firstFetchUrl");
  let entries: any[] = Object.values(result.log || {});
  let lastEntry = entries[entries.length - 1];
  let lastTimestamp = lastEntry.timestamp;
  console.log(entries.length)

  while (true) {
    const fetchUrl = `https://api.torn.com/v2/user?selections=log&to=${lastTimestamp}&striptags=false`;
    result = await fetchLogs(fetchUrl);
    entries.push(...Object.values(result.log || {}));
    lastEntry = entries[entries.length - 1];
    lastTimestamp = lastEntry.timestamp;
    console.log(lastTimestamp);
    console.log(lastEntry)
    console.log(entries.length)
    await sleep(500);
  }
};

run();
*/
