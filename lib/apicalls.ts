export const ApiUrlBasic = "https://api.torn.com/v2/user?selections=basic"

export async function getBasic (url: string, apikey: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
  });

  const data = await res.json()
  return data;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const fetchLogs = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${"ApiKey"}`,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
};

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
