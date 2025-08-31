import { findProducts } from "@/actions/products/find-products"
import { Metadata } from "next"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata: Metadata = {
    title: "stock App | Produtos",
}

// async function getData(): Promise<Payment[]> {
//     return Array.from({ length: 50 }).map(() => ({
//         id: randomUUID(),
//         amount: 100,
//         status: "pending",
//         email: "m@example.com"
//     }))
// }

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