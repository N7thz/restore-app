"use client"

import { DialogDeleteProduct } from "@/components/card-product-stok/dialog-delete-product"
import { FormUpdateProductEntry } from "@/components/forms/form-update-product-entry"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ProductEntry } from "@prisma/client"
import { Edit, Ellipsis } from "lucide-react"
import { DialogDeleteProductEntry } from "./dialog-delete-product-entry"

export const CardProductEntryMenu = ({
	productEntry,
	name,
}: {
	productEntry: ProductEntry
	name: string
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<Ellipsis className="group-hover:-translate-y-0.5 duration-200" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-58">
				<DropdownMenuLabel>Opções</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild></DropdownMenuItem>
				<DropdownMenuItem asChild>
					<AlertDialog>
						<AlertDialogTrigger
							className={cn([
								"w-full hover:bg-accent",
								"dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
								"focus:bg-accent focus:text-accent-foreground",
								"data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive",
							])}>
							<Edit className="size-4" />
							Editar
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Atualizar entrada de produto
								</AlertDialogTitle>
								<AlertDialogDescription>
									Modifique os campos abaixo para atualizar a entrada do
									produto.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<FormUpdateProductEntry name={name} productEntry={productEntry} />
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DialogDeleteProductEntry id={productEntry.id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
