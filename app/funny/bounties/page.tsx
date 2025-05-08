"use client";
import { useBounties } from "./useBounties";
import { useEffect } from "react";

export default function BountiesPage() {

    useEffect(() => {
        useBounties()
    }, [])

 return (<main>
    <span>bounties page</span>
 </main>)
 
}