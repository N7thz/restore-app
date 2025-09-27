import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"

export const createdAt: ColumnDef<ProductExit & { product: Product }> = {
	accessorKey: "createdAt",
	header: ({ column }) => (
		<DataTableColumnHeader title="Data de saída" column={column} />
	),
	cell: ({ row }) => (
		<div className="text-center">
			{formatDate(row.getValue("createdAt"), "PPP", { locale: ptBR })}
		</div>
	),
}
