import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const description: ColumnDef<Product> = {
  accessorKey: "description",
  header: "Descrição",
}
