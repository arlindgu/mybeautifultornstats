import { getFromTorn } from "@/lib/apicalls"
import { Items } from "./columns"

export async function useItems(): Promise<Items[]> {
        const res = await getFromTorn("cl8xxMu2j7GkLdKT","items")
        console.log(res)
        return res.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: item.type,
            description: item.description,
            effect: item.effect,
            requirement: item.requirement,
            weapon_type: item.weapon_type,
            sub_type: item.sub_type,
            is_masked: item.is_masked,
            is_found_in_city: item.is_found_in_city,
            is_tradable: item.is_tradable,
            value: {
            buy_price: item.value.buy_price,
            sell_price: item.value.sell_price,
            market_price: item.value.market_price,
            },
            circulation: item.circulation,
            image: item.image,
        }))
    }