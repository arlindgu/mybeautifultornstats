"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NotepadText, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Items = {
    id: number
    name: string
    description: string
    effect: string
    requirement: string | null
    type: string
    sub_type: string | null
    is_masked: boolean
    is_tradable: boolean
    is_found_in_city: boolean
    value: {
        buy_price: number | null
        sell_price: number | null
        market_price: number
    }
    circulation: number
    image: string
}



export const columns: ColumnDef<Items>[] = [
    { accessorKey: "image", header: "Icon" },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    {
        header: "Details",
        id: "details",
        cell: ({ row }) => {
            const { description, effect, requirement } = row.original
            const text = [
                description && `Description: ${description}`,
                effect && `Effect: ${effect}`,
                requirement && `Requirement: ${requirement}`
            ].filter(Boolean).join("\n\n")

            return text ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className="cursor-help text-muted-foreground"><NotepadText color="white" size={20} /></span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs whitespace-pre-wrap">{text}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                ""
            )
        }
    },
    {
        header: "Type / Subtype",
        accessorFn: row => `${row.type}${row.sub_type ? ` / ${row.sub_type}` : ""}`,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.type}</span>
                {row.original.sub_type && (
                    <span className="text-xs text-muted-foreground">{row.original.sub_type}</span>
                )}
            </div>
        )
    },
    { accessorKey: "is_masked", header: "Masked" },
    { accessorKey: "is_tradable", header: "Tradable" },
    { accessorKey: "is_found_in_city", header: "Found In City" },
    { accessorKey: "value.buy_price", header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Buy
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }, cell: ({ getValue }) => getValue() ? Number(getValue()).toLocaleString("en-US") : "N/A" },
    { accessorKey: "value.sell_price", header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sell
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }, cell: ({ getValue }) => getValue() ? Number(getValue()).toLocaleString("en-US") : "N/A"  },
    { accessorKey: "value.market_price", header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Market
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }, cell: ({ getValue }) => getValue() ? Number(getValue()).toLocaleString("en-US") : "N/A"  },
    { accessorKey: "circulation", header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Circulation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }, cell: ({ getValue }) => getValue() ? Number(getValue()).toLocaleString("en-US") : "N/A"  },
];