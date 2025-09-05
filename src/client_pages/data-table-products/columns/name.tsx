import {
    DataTableColumnHeader
} from "@/components/data-table/data-table-column-header"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const name: ColumnDef<Product> = {
    accessorKey: "name",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Nome"
            column={column}
        />
    ),
}