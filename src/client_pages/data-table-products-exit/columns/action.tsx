import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Ellipsis, Undo2 } from "lucide-react"
import Link from "next/link"
import { DialogDeleteProductExit } from "./dialog-delete-product-exit"
import { useState } from "react"

export const actions: ColumnDef<ProductExit & { product: Product }> = {
  id: "actions",
  cell: ({ row }) => {
    const { id } = row.original

    const [open, setOpen] = useState(false)

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <span className="sr-only">Open menu</span>
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/products-exit/${id}`}>
              <Undo2 className="size-4" />
              Visualizar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/update-product-exit/${id}`}>
              <Edit className="size-4" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DialogDeleteProductExit id={id} setOpen={setOpen} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
