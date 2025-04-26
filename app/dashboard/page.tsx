"use client"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle } from "@/components/ui/card"
import { useEffect,useState } from "react";
import Image from "next/image";
import { openDB } from "idb";


export default function DashboardPage() {

    const [profilePictureUrl, setProfilePictureUrl] = useState("");


useEffect(() => {
        (async () => {
            const db = await openDB("MBTS")
            const profile = await db.get("profile", "profile")
            setProfilePictureUrl(profile.profile_image)
        })();
    },[]);

 return (
    <main className="flex">
        <div className="m-5 grid grid-col-10 grid-rows-4 gap-4 h-screen w-full">
            <div className="bg-amber-300 flex justify-center item-center col-span-4 row-span-3">123</div>
            <div className="bg-amber-300 flex justify-center item-center col-span-5 row-span-2">123</div>
            <div className="bg-amber-300 flex justify-center item-center col-span-2 row-span-4">123</div>
            <div className="bg-amber-300 flex justify-center item-center col-span row-span">123</div>
            <div className="bg-amber-300 flex justify-center item-center col-span row-span">123</div>
            <div className="bg-amber-300 flex justify-center item-center col-span row-span">123</div>
            <div className="bg-amber-300 flex justify-center item-center col-span row-span">123</div>
        </div>


        {/* Add your other cards here */}

    </main>
    );
        }