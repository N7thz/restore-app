import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const quantity: ColumnDef<ProductExit> = {
    accessorKey: "quantity",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Quantidade"
            column={column}
        />
    ),
    cell: ({ row }) => (
        <div className="text-center">
            {row.getValue("quantity")}
        </div>
    )
}