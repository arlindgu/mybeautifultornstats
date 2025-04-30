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
import { useSettings, saveToLocalStorage } from "./useSettings"
import { toast } from "sonner"

export default function SettingsPage() {

    let { apiKey, apiRateLimit } = useSettings();

    function handleClick(id: string) {
        const input = document.getElementById(id) as HTMLInputElement | null;
        if (input === null) {
            return;
        }

        if (!input.value.trim()) {
            toast("Please enter a value");
            return;
          }
    
        saveToLocalStorage(id, input.value);
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
                    <Input min={1} max={100} id="apiRateLimit" placeholder={String(apiRateLimit) || "1"} onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 1 && value <= 100) {
                          e.currentTarget.value = String(value);
                        } else {
                          e.preventDefault();
                        }
                      }}></Input>
                    <Button onClick={() => handleClick("apiRateLimit")}>Set Limit</Button>
                    </div>
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
                    <Input id="apiKey" placeholder={apiKey || "Unknown"}></Input>
                    <Button onClick={() => handleClick("apiKey")}>Set ApiKey</Button>
                    </div>
                </div>
                </CardContent>
    </Card>
        </main>

    





    )
}