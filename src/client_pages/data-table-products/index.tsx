"use client"

import { findProducts } from "@/actions/products/find-products"
import { queryKeys } from "@/lib/query-keys"
import { columns } from "@/client_pages/data-table-products/columns"
import { DataTable } from "@/client_pages/data-table-products/data-table"
import { useQuery } from "@tanstack/react-query"

export const DataTableProducts = () => {

    const { data, isLoading, status } = useQuery({
        queryKey: queryKeys.findAllProducts(),
        queryFn: () => findProducts()
    })

    if (isLoading) {
        return (
            <main className="h-container flex items-center justify-center p-8">
                <DataTable
                    columns={columns}
                    data={[]}
                    isLoading={isLoading}
                />
            </main>
        )
    }

    if (status === "error" || !data) {
        return (
            <main className="h-container flex items-center justify-center p-8">
                error
            </main>
        )
    }

    return (
        <main className="h-container flex items-center justify-center p-8">
            <DataTable
                columns={columns}
                data={data.products}
            />
        </main>
    )
}
