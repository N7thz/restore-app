import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const username: ColumnDef<ProductExit & { product: Product }> = {
  accessorKey: "username",
  header: ({ column }) => (
    <DataTableColumnHeader title="Entrege a" column={column} />
  ),
  cell: ({ row }) => (
    <div className="text-center capitalize">{row.getValue("username")}</div>
  ),
}
