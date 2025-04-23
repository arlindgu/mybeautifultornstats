export const ApiEndpoints = {
  basic: "https://api.torn.com/v2/user?selections=basic&striptags=false",
  battlestats: "https://api.torn.com/v2/user?selections=battlestats&striptags=false",
  profile: "https://api.torn.com/v2/user?selections=profile&striptags=false",
  firstLog: "https://api.torn.com/v2/user?selections=log&striptags=false",
}

export async function getMoneyOutgoing(apikey: string, to: number) {
  const res = await fetch(`https://api.torn.com/user/?key=${apikey}}&cat=17&to=${to}&selections=log`, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
  });

  const data = await res.json()
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
  return data;
}

export async function getMoneyIncoming(apikey: string, to: number) {
  const res = await fetch(`https://api.torn.com/user/?key=${apikey}}&cat=14&to=${to}&selections=log`, {
    method: "GET",
    headers: {
      Authorization: `ApiKey ${apikey}`,
    }
  });

  const data = await res.json()
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
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
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
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
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
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
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
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
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
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
  if (data.error) {
    const retry = await handleTornApiError(data.error.code);
    if (retry) {
      return data;
    }
  }
  return data;
}


export async function handleTornApiError(errorCode: number): Promise<boolean> {
  switch (errorCode) {
    case 0:
      console.log("Unknown error : Unhandled error, should not occur."); break;
    case 1:
      console.log("Key is empty : Private key is empty in current request."); break;
    case 2:
      console.log("Incorrect Key : Private key is wrong/incorrect format."); break;
    case 3:
      console.log("Wrong type : Requesting an incorrect basic type."); break;
    case 4:
      console.log("Wrong fields : Requesting incorrect selection fields."); break;
    case 5:
      console.log("Too many requests : Requests are blocked for a small period of time because of too many requests per user (max 100 per minute).");
      await new Promise(resolve => setTimeout(resolve, 60000));
      return true;
    case 6:
      console.log("Incorrect ID : Wrong ID value."); break;
    case 7:
      console.log("Incorrect ID-entity relation : A requested selection is private (For example, personal data of another user / faction)."); break;
    case 8:
      console.log("IP block : Current IP is banned for a small period of time because of abuse."); break;
    case 9:
      console.log("API disabled : Api system is currently disabled."); break;
    case 10:
      console.log("Key owner is in federal jail : Current key can't be used because owner is in federal jail."); break;
    case 11:
      console.log("Key change error : You can only change your API key once every 60 seconds."); break;
    case 12:
      console.log("Key read error : Error reading key from Database."); break;
    case 13:
      console.log("The key is temporarily disabled due to owner inactivity : The key owner hasn't been online for more than 7 days."); break;
    case 14:
      console.log("Daily read limit reached : Too many records have been pulled today by this user from our cloud services."); break;
    case 15:
      console.log("Temporary error : An error code specifically for testing purposes that has no dedicated meaning."); break;
    case 16:
      console.log("Access level of this key is not high enough : A selection is being called of which this key does not have permission to access."); break;
    case 17:
      console.log("Backend error occurred, please try again."); break;
    case 18:
      console.log("API key has been paused by the owner."); break;
    case 19:
      console.log("Must be migrated to crimes 2.0."); break;
    case 20:
      console.log("Race not yet finished."); break;
    case 21:
      console.log("Incorrect category : Wrong cat value."); break;
    case 22:
      console.log("This selection is only available in API v1."); break;
    case 23:
      console.log("This selection is only available in API v2."); break;
    case 24:
      console.log("Closed temporarily."); break;
    default:
      console.log("Unhandled Torn API error code:", errorCode); break;
  }
  return false;
}