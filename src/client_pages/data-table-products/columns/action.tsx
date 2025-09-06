import {
    DialogDeleteProduct
} from "@/components/card-product-stok/dialog-delete-product"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Ellipsis, Undo2 } from "lucide-react"
import Link from "next/link"

export const actions: ColumnDef<Product> = {
    id: "actions",
    cell: ({ row }) => {

        const { id } = row.original

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size={"icon"}
                    >
                        <span className="sr-only">Open menu</span>
                        <Ellipsis className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="w-52"
                >
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/products/${id}`}>
                            <Undo2 className="size-4" />
                            Visualizar
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/update-product/${id}`}>
                            <Edit className="size-4" />
                            Editar
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <DialogDeleteProduct id={id} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
}