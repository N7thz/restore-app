"use client"

import { findProducts } from "@/actions/products/find-products"
import { queryKeys } from "@/lib/query-keys"
import { columns } from "@/pages/data-table-products/columns"
import { DataTable } from "@/pages/data-table-products/data-table"
import { useQuery } from "@tanstack/react-query"

export const DataTableProducts = () => {

    const { data, isLoading, status } = useQuery({
        queryKey: queryKeys.findAllProducts(),
        queryFn: () => findProducts()
    })

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <DataTable
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
            <DataTable
                columns={columns}
                data={data.products}
            />
        </div>
    )
}
