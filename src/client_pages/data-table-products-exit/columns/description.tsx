import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const description: ColumnDef<ProductExit & { product: Product }> = {
    accessorKey: "description",
    header: "Descrição",
}