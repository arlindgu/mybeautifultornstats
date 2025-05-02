import { setCookie, getCookie } from "@/lib/apicalls";
import { useState } from "react";

export function useSettings() {

    const [apiKey, setApiKey] = useState<string | null>(null);
    const [apiRateLimit, setApiRateLimit] = useState<number | null>(null);

    const saveSetting = async (key: string, value: string) => {
        const message = await setCookie(key, value);
        console.log(message)
        return true;
    }

        (async () => {
            const cookieApiKey = await getCookie("apiKey");
            const apiRateLimit = await getCookie("apiRateLimit");
            setApiKey(cookieApiKey.value);
            setApiRateLimit(Number(apiRateLimit.value));
        })();

    return {
        apiKey, setApiKey,
        apiRateLimit, setApiRateLimit,
        saveSetting
      }
}