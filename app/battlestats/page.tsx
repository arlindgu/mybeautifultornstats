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
        { title: "Strength", value: stats?.strength ?? 0 },
        { title: "Defense", value: stats?.defense ?? 0 },
        { title: "Speed", value: stats?.speed ?? 0 },
        { title: "Dexterity", value: stats?.dexterity ?? 0 }
    ];

    const battleStatsInfo = [
        { title: "Strength Info", value: statsInfo.strengthInfo },
        { title: "Defense Info", value: statsInfo.defenseInfo },
        { title: "Speed Info", value: statsInfo.speedInfo },
        { title: "Dexterity Info", value: statsInfo.dexterityInfo }
    ];

    const battleStatsModifier = [
        { title: "Strength Modifier", value: statsModifier?.strengthModifier ?? 0 },
        { title: "Defense Modifier", value: statsModifier?.defenseModifier ?? 0 },
        { title: "Speed Modifier", value: statsModifier?.speedModifier ?? 0 },
        { title: "Dexterity Modifier", value: statsModifier?.dexterityModifier ?? 0 }
    ];

    let sumBattleStats = 0;
    for (let i = 0; i < battleStats.length; i++) {
        sumBattleStats += battleStats[i].value;
    }

    let sumBattleStatsWithModifier = 0;
    for (let i = 0; i < battleStatsModifier.length; i++) {
        sumBattleStatsWithModifier += Math.round(((battleStats[i].value) * (battleStatsModifier[i].value / 100 + 1)));
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="grid grid-cols-4 grid-rows-2 gap-4">

                <Card className="col-span-4 row-span-1 row-start-2 h-fit items-center">
                    <CardHeader className="text-center w-full">
                        <CardTitle className="">
                        Total Battlestats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-center">
                            <p className="text-2xl font-bold text-white">{Number(sumBattleStatsWithModifier).toLocaleString("en-US")}</p>
                            <p className="text-xl font-bold text-zinc-700">{Number(sumBattleStats).toLocaleString("en-US")}</p>
                        </CardDescription>
                    </CardContent>
                </Card>
                
                {battleStats.map((stat, index) => (
                    <Card className="col-span-1 row-span-1" key={index}>
                        <CardHeader>
                            <CardTitle>{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p data-stat-modified={stat.title.toLowerCase()} className="mb-5 text-2xl font-bold">
                                {Math.round(Number(battleStats[index].value) * (Number(battleStatsModifier[index].value) / 100 + 1)).toLocaleString("en-US")}
                            </p>

                            <ul className="text-xs list-none list-inside">
                                {Array.isArray(battleStatsInfo[index].value)
                                    ? battleStatsInfo[index].value.map((line: string, i: number) => (
                                        <li key={i} className={line.trim().startsWith("+") ? "text-green-600" : line.trim().startsWith("-") ? "text-red-600" : ""}>
                                            {line}
                                        </li>
                                    ))
                                    : <li>{battleStatsInfo[index].value}</li>}
                            </ul>
                            <p className="text-xs">= {battleStatsModifier[index].value}%</p>
                            <p data-stat-unmodified={stat.title.toLowerCase()} className="text-xl font-bold text-zinc-700 mb-2">{Number(stat.value).toLocaleString("en-US")}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}