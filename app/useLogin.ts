import { setCookie, getCookie } from "lib/apicalls"

export function useLogin() {

  const login = async (key: string) => {
    const data = await setCookie("apiKey", key); // Setze den Cookie mit dem API-Key
    console.log(data);

    const testLogs = await checkApiKey();
    console.log('Res von route.ts',testLogs) // Teste den API-Key
    return true;
  };

  const getApiKey = async (key: string) => {
    const apiKey = await getCookie("apiKey");
    console.log(apiKey) // Hole den Cookie mit dem API-Key
    return apiKey.value;
  }

  const checkApiKey = async () => {
    const response = await fetch("/api/torn/get-profile")
    const data = await response.json();
    return data
  }
  return { login, getApiKey, checkApiKey };

}