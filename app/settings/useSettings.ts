"use client"
import { useEffect, useState } from "react";

export function useSettings() {

    const [apiKey, setApiKey] = useState<string | null>("");
    const [apiRateLimit, setApiRateLimit] = useState<number | null>(0);

    useEffect(() => {
        const storedKey = localStorage.getItem("apiKey");
        if (storedKey !== null) setApiKey(storedKey);

        const storedRateLimit = localStorage.getItem("apiRateLimit");
        if (storedRateLimit !== null) setApiRateLimit(Number(storedRateLimit));
    }, []);

    return {
        apiKey, setApiKey,
        apiRateLimit, setApiRateLimit,
      }
}

export function saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}