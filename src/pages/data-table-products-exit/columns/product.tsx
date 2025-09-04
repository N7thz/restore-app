import { findProductById } from "@/actions/products/find-product-by-id"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const productId: ColumnDef<ProductExit> = {
    accessorKey: "product",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Produto"
            column={column}
        />
    ),
    cell: ({ row }) => {

        const { name } = row.getValue("product") as Product

        return (
            <div className="text-center capitalize">
                {name}
            </div>
        )
    },
}