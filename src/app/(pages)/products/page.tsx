import { findProducts } from "@/actions/products/find-products"
import { Metadata } from "next"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export const metadata: Metadata = {
    title: "stock App | Produtos",
}

export default async function Products() {

    const { products } = await findProducts()

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={columns}
                data={products}
            />
        </div>
    )
}