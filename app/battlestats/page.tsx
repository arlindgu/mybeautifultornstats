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
import { useBattleStats } from "@/hooks/useBattleStats";

export default function WelcomePage() {
    const { stats, statsInfo, statsModifier } = useBattleStats();

    const battleStats = [
        { title: "Strength", value: stats.strength },
        { title: "Defense", value: stats.defense },
        { title: "Speed", value: stats.speed },
        { title: "Dexterity", value: stats.dexterity }
    ];

    const battleStatsInfo = [
        { title: "Strength Info", value: statsInfo.strengthInfo },
        { title: "Defense Info", value: statsInfo.defenseInfo },
        { title: "Speed Info", value: statsInfo.speedInfo },
        { title: "Dexterity Info", value: statsInfo.dexterityInfo }
    ];

    const battleStatsModifier = [
        { title: "Strength Modifier", value: statsModifier.strengthModifier },
        { title: "Defense Modifier", value: statsModifier.defenseModifier },
        { title: "Speed Modifier", value: statsModifier.speedModifier },
        { title: "Dexterity Modifier", value: statsModifier.dexterityModifier }
    ];

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen gap-4">
                {battleStats.map((stat, index) => (
                    <Card className="h-fit" key={index}>
                        <CardHeader>
                            <CardTitle>{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p id="battleStatModified" className="mt-2 text-2xl font-bold">
                                {Math.round(Number(battleStats[index].value) * (Number(battleStatsModifier[index].value)/100 + 1)).toLocaleString("en-US")}
                            </p>
                            
                            <ul className="text-xs list-none list-inside space-y-1">
                                {Array.isArray(battleStatsInfo[index].value)
                                    ? battleStatsInfo[index].value.map((line: string, i: number) => (
                                        <li key={i} className={line.trim().startsWith("+") ? "text-green-600" : line.trim().startsWith("-") ? "text-red-600" : ""}>
                                            {line}
                                        </li>
                                    ))
                                    : <li>{battleStatsInfo[index].value}</li>}
                            </ul>
                            <p className="text-xl font-bold text-zinc-700 mb-2">{Number(stat.value).toLocaleString("en-US")}</p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-xs font-light text-gray-500">Last updated: just now</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}