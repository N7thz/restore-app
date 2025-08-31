import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const description: ColumnDef<ProductExit> = {
    accessorKey: "description",
    header: "Descrição",
}