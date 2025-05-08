"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import { useLiveQuery } from "dexie-react-hooks";
import {db} from "@/lib/db";



export default function DashboardPage() {

    const profile = useLiveQuery(() => db.profile.toCollection().first());

    return (
        <main className="flex gap-2 w-full flex-wrap">
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={String(profile?.profile_image)}
                                alt="Profile Picture"
                            />
                        </Avatar>
                        <CardTitle className="flex flex-col">
                            <span className="text-base font-semibold">hello,</span>
                            <span className="italic font-light">{profile?.name}</span>
                        </CardTitle>
                    </div>
                    {
                    /*Object.entries(profileStats).map(([label, value], index) => (
                        <CardTitle key={index} className="flex flex-col text-center">
                            <span className="text-base font-semibold">{label}</span>
                            <span className="font-light italic">{value}</span>
                        </CardTitle>
                    ))
                        */}
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Employment Status</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                    
                    <span>{/*profile.job.company_name*/}</span>
                    <span>{/*profile.job.position*/}</span>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Faction</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <span>{/*profile.faction.faction_name*/}</span>
                    <span>{/*profile.faction.position*/}</span>
                </CardContent>
            </Card>


        </main>
    );
}