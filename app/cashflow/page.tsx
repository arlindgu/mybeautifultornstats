"use client";

import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { fetchMoneyOutgoing } from "@/hooks/useMoneyOutgoing";
import { useEffect } from "react";
import { getTotalCostByLog } from "@/hooks/useTest";

export default function CashflowPage() {

    useEffect(() => {
        getTotalCostByLog(8340).then((total) => {
            console.log("Total cost für log:", total);
        });
    }, []);
    
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center w-full h-screen">
                <div className="grid grid-cols-4 grid-rows-2 gap-4">
                    <div className="col-span-4 row-span-1 row-start-2 h-fit items-center">
                        <div className="text-center w-full">
                            <h1 className="text-3xl font-bold">Cashflow</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}