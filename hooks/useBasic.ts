"use client";

import { useEffect, useState } from "react";
import { getBasic, ApiEndpoints } from "@/lib/apicalls";
import { saveBasic } from "@/lib/db";

export function useBasic() {
    const [username, setUsername] = useState<string | null>(null);
  
    useEffect(() => {
      const key = localStorage.getItem("api_key");
      if (!key) return;
  
      getBasic(ApiEndpoints.basic, key).then((basic) => {
        document.cookie = `username=${basic["name"]}; path=/`;
        setUsername(basic["name"]);
        saveBasic(basic);
      });
    }, []);
  
    return username;
  }