"use client"

import { findProductsExit } from "@/actions/products-exit/find-products-exit"
import { queryKey } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { DataTableExit } from "./data-table"
import { columns } from "./columns"
import { ProductExitWithProduct } from "@/types"
import { cn } from "@/lib/utils"

export const DataTableProductsExit = () => {
    const {
        data: products,
        isLoading,
        status,
    } = useQuery({
        queryKey: queryKey.findAllProductsExit(),
        queryFn: () =>
            findProductsExit<ProductExitWithProduct>({
                include: {
                    product: true,
                },
            }),
    })

    if (isLoading) {
        return (
            <main className="h-container flex items-center justify-center p-8">
                <DataTableExit columns={columns} data={[]} isLoading={isLoading} />
            </main>
        )
    }

    if (status === "error" || !products) {
        return (
            <main className="h-container flex items-center justify-center p-8">
                <DataTableExit columns={columns} data={[]} />
            </main>
        )
    }

    return (
        <main className={cn(
            "h-container flex items-center justify-center p-8",
            "max-sm:px-4"
        )} >
            <DataTableExit columns={columns} data={products} />
        </main>
    )
}
