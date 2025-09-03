import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const price: ColumnDef<Product> = {
    accessorKey: "price",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {

        const price = parseFloat(row.getValue("price"))

        const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)

        return (
            <div className="text-center">
                {formatted}
            </div>
        )
    },
}