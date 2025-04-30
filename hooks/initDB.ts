import { addObjectStores, createDb } from "@/lib/db";

export function initDB() {

    const objectStores = [
        "profile",
        "battlestats",
        "inventory",
        "quests",
        "achievements",
        "friends",
        "trading",
        "settings"]

        const db = createDb("MBTS", 0)
        addObjectStores("MBTS", objectStores)



 return (
    console.log("DB initialized")
)
}
