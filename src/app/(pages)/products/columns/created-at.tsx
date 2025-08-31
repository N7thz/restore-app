import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"

export const createdAt: ColumnDef<Product> = {
    accessorKey: "createdAt",
    header: ({ column }) => (
        <DataTableColumnHeader
            title="Data de criação"
            column={column}
        />
    ),
    cell: ({ row }) => (
        <div className="text-center">
            {formatDate(row.getValue("createdAt"), "PPP", { locale: ptBR })}
        </div>
    )
}