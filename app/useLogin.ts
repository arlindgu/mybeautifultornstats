import { setCookie, getCookie } from "lib/apicalls"
import { useRouter } from "next/navigation";

export function useLogin() {
  const route = useRouter();

  const login = async (key: string) => {
    const data = await setCookie("apiKey", key); // Setze den Cookie mit dem API-Key
    console.log(data);


    const test = await checkApiKey();
    if (test) route.push("/dashboard");
    return true;
  };

  const getApiKey = async (key: string) => {
    const apiKey = await getCookie("apiKey");
    console.log(apiKey) // Hole den Cookie mit dem API-Key
    return apiKey.value;
  }

  const checkApiKey = async () => {
    const response = await fetch("/api/torn/get-user-data?selection=basic")
    const data = await response.json();
    console.log(data);
    if (data.error) return false; else return true;
  }
  return { login, getApiKey, checkApiKey };
}