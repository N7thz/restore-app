"use client"

import { findProductsExit } from "@/actions/product-exit/find-products-exit"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { DataTableExit } from "./data-table"
import { columns } from "./columns"

export const DataTableProductsExit = () => {

    const { data, isLoading, status } = useQuery({
        queryKey: queryKeys.findAllProducts(),
        queryFn: () => findProductsExit()
    })

    if (isLoading) {
        return (
            <main className="h-container flex items-center justify-center p-8">
                <DataTableExit
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
                Error
            </main>
        )
    }

    return (
        <main className="h-container flex items-center justify-center p-8">
            <DataTableExit
                columns={columns}
                data={data.products}
            />
        </main>
    )
}
