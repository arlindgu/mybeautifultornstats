import { openDB } from "idb";

(async () => {
    const db = await openDB("mbts-db", 1);
    const all = await db.getAll("Money Outgoing");
    
    for (const entry of all) {
        console.log(all)
    }
        

    })();