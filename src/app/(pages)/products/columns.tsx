"use client"

import {
    DialogDeleteProduct
} from "@/components/card-product-stok/dialog-delete-product"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
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
import { formatDate } from "date-fns"
import { ptBR, tr } from "date-fns/locale"
import { Dice1, Edit, Ellipsis } from "lucide-react"
import Link from "next/link"

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Product>[] = [
    {
        id: "actions",
        cell: ({ row }) => {

            const payment = row.original

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
                            <Link href={`/update-product/${payment.id}`}>
                                <Edit className="size-4" />
                                Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <DialogDeleteProduct id={payment.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader
                title="Nome"
                column={column}
            />
        ),
    },
    {
        accessorKey: "description",
        header: "Descrição",
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Preço" />
        ),
        cell: ({ row }) => {

            const price = parseFloat(row.getValue("price"))

            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(price)

            return (
                <div className="font-medium">
                    {formatted}
                </div>
            )
        },  
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader
                title="Quantidade"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <div className="mx-auto text-center pr-12">
                {row.getValue("quantity")}
            </div>
        )
    },
    {
        accessorKey: "minQuantity",
        header: ({ column }) => (
            <DataTableColumnHeader
                title="Quantidade minima"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <div className="mx-auto text-center pr-12">
                {row.getValue("minQuantity")}
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader
                title="Data de criação"
                column={column}
            />
        ),
        cell: ({ row }) => (
            <div className="font-medium">
                {formatDate(row.getValue("createdAt"), "PPP", { locale: ptBR })}
            </div>
        )
    },
]