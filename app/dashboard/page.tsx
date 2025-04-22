"use client";

import Header from "@/components/header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function WelcomePage() {

    const stats = [
        { title: "Strength", value: "12345" },
        { title: "Defense", value: "67890" },
        { title: "Speed", value: "11111" },
        { title: "Dexterity", value: "22222" }
    ];


    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen gap-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{stat.title}</CardTitle>
                            <CardDescription>{stat.value}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{stat.title} stat content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Last updated: just now</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}