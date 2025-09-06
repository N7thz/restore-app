import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const productId: ColumnDef<ProductExit & { product: Product }> = {
    accessorKey: "product",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Produto"
            column={column}
        />
    ),
    cell: ({ row }) => {

        const { product } = row.original

        return (
            <div className="text-center capitalize">
                {product?.name}
            </div>
        )
    },
    filterFn: (row, _, filterValue: string) => {

        const { name } = row.getValue<Product>("product")

        console.log(name)

        return name.toLowerCase().includes(filterValue.toLowerCase())
    }
}