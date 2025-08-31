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
            <div className="container mx-auto py-10">
                <DataTableExit
                    columns={columns}
                    data={[]}
                    isLoading={isLoading}
                />
            </div>
        )
    }

    if (status === "error" || !data) {
        return (
            <div>
                Error
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <DataTableExit
                columns={columns}
                data={data.products}
            />
        </div>
    )
}
