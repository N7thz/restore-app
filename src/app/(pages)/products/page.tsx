import { DataTableProducts } from "@/pages/data-table-products"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "stock App | Produtos",
}

export default function Products() {
    return (
        <DataTableProducts />
    )
}