"use client"


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSettings } from "./useSettings"
import { toast } from "sonner"
import { set } from "react-hook-form"

export default function SettingsPage() {

    const { setApiKey, apiKey } = useSettings();
    const { setApiRateLimit, apiRateLimit } = useSettings();
    const { saveSetting } = useSettings();


    function handleClick(id: string) {
        const input = document.getElementById(id) as HTMLInputElement | null;
        if (input === null) {
            return;
        }

        if (!input.value.trim()) {
            toast("Please enter a value");
            return;
          }
        toast(`${id} has been set to ${input.value}`);
    }

    return (
        <main className="flex gap-5">
            <Card>
        <CardHeader>
            <CardTitle>API-Rate Limit</CardTitle>
            <CardDescription>Set your preferred API request rate limit</CardDescription>
            <CardDescription className="text-xs">NOTE: The maximum allowed is 100 requests per minute. We recommend setting it to 60 for optimal performance</CardDescription>
        </CardHeader>
        <CardContent>
                <div className="flex flex-col gap-2">

                    <Label>Rate Limit</Label>
                    <div className="flex flex-row gap-2">
                    <Input min={1} max={100} id="apiRateLimit" onChange={(e) => setApiRateLimit(Number(e.target.value))}></Input>
                    <Button onClick={() => saveSetting("apiRateLimit", `${apiRateLimit}`)}>Change Limit</Button>
                    </div>
                    <p className="text-xs">Current Rate-Limit: {apiRateLimit}</p>
                </div>
                </CardContent>
    </Card>
    <Card>
        <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>Your current API Key is displayed below:</CardDescription>
            <CardDescription className="text-xs">If you accidentally deleted or modified your API key, you can update it here.</CardDescription>
        </CardHeader>
        
        <CardContent>
        <div className="flex flex-col gap-2">
                    <Label>API Key</Label>
                    <div className="flex flex-row gap-2">
                    <Input id="apiKey"/>
                    <Button onClick={() => handleClick("apiKey")}>Change ApiKey</Button>
                    </div>
                    <p className="text-xs">Current ApiKey: {apiKey}</p>
                </div>
                </CardContent>
    </Card>
        </main>

    





    )
}