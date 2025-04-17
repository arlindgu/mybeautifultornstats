"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { getBasic, ApiUrlBasic } from "@/lib/apicalls";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const key = localStorage.getItem("api_key");
    if (!key) return;

    getBasic(ApiUrlBasic, key).then((name) => {
      setUsername(name["name"]);
    });
  }, []);

  return (
    <div className="p-8">
      <Header />
      <h1 className="text-2xl font-bold">Welcome {username ?? "..."}</h1>
    </div>
  );
}