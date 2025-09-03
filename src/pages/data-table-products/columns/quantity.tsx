import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const quantity: ColumnDef<Product> = {
    accessorKey: "quantity",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Quantidade"
            column={column}
        />
    ),
    cell: ({ row }) => (
        <div className="text-center" >
            {row.getValue("quantity")}
        </div>
    )
}