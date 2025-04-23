"use client";

import { openDB } from "idb";
import { countDB } from "@/lib/db";
import { useEffect } from "react";

export default function TestPage() {

    useEffect(() => {
        (async () => {
          const { paysPerCompany, totalPay } = await getTotalPayFromCompanyLogs();
          console.log("Pay pro Company:", paysPerCompany);
          console.log("Total Company Pay:", totalPay.toLocaleString("en-US"));
        })();
      }, []);

      async function getTotalPayFromCompanyLogs() {
        const db = await openDB("mbts-db", 1);
        const all = await db.getAll("Money Incoming");

        const companyPays = Object.values(all).filter((entry: any) => entry?.log === 6221);

        const paysPerCompany: Record<number, number> = {};

        for (const entry of companyPays) {
          const companyId = entry.data?.company;
          const pay = entry.data?.pay ?? 0;

          if (companyId) {
            paysPerCompany[companyId] = (paysPerCompany[companyId] ?? 0) + pay;
          }
        }

        const totalPay = Object.values(paysPerCompany).reduce((sum, val) => sum + val, 0);

        return { paysPerCompany, totalPay };
      }


    return (
        <div>
            <h1 className="text-3xl font-bold">Testing</h1>
            <p>Test</p>
        </div>
    );
}