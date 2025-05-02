import { Suspense } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useItems } from "./useItems"
import { Skeleton } from "@/components/ui/skeleton"

async function TableContent() {
  const data = await useItems()
  return <DataTable columns={columns} data={data} />
}

export default function ItemsPage() {
  return (
    <div className="overflow-x-auto overflow-y-auto">
        <TableContent />
    </div>
  )
}