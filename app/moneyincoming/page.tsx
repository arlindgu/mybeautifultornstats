"use client";

import { Progress } from "@/components/ui/progress";
import { useMoneyIncoming } from "./useMoneyIncoming";
import { useEffect } from "react";

export default function CashflowPage() {

  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center flex-1">
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          <div className="col-span-4 row-span-1 row-start-2 h-fit items-center">
            <div className="text-center w-full">
              <h1 className="text-3xl font-bold">Cashflow</h1>
              <Progress value={progress}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}