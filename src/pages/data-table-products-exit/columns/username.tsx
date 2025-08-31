import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const username: ColumnDef<ProductExit> = {
    accessorKey: "username",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Entrege a"
            column={column}
        />
    ),
    cell: ({ row }) => (
        <div className="text-center capitalize">
            {row.getValue("username")}
        </div>
    ),
}