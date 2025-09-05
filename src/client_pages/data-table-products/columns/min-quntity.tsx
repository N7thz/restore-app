import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const minQuantity: ColumnDef<Product> = {
    accessorKey: "minQuantity",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Quantidade minima"
            column={column}
        />
    ),
    cell: ({ row }) => {
        return (
            <div className="text-center">
                {row.getValue("minQuantity")}
            </div>
        )
    }
}