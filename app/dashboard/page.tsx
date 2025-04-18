"use client";

import Header from "@/components/header";
import { useBasic } from "@/hooks/useBasic";

export default function DashboardPage() {

  const username = useBasic();


  return (
    <div className="p-8">
      <Header />
      <h1 className="text-2xl font-bold">Welcome {username ?? "..."}</h1>
    </div>
  );
}