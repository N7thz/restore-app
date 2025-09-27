"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Edit, Ellipsis, Plus } from "lucide-react"
import Link from "next/link"
import { FormCreateProductEntry } from "../forms/form-create-product-entry"
import { Separator } from "../ui/separator"
import { DialogDeleteProduct } from "./dialog-delete-product"

export const CardProductStokMenu = ({ id }: { id: string }) => {
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
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger
              className={cn([
                "w-full hover:bg-accent",
                "dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                "focus:bg-accent focus:text-accent-foreground",
                "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive",
              ])}
            >
              <Plus />
              Adicionar entrada
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Adicionar entrada de produto
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Adicione uma entrada de produto ao estoque.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Card className="bg-transparent border-none shadow-none">
                <Separator />
                <FormCreateProductEntry />
              </Card>
            </AlertDialogContent>
          </AlertDialog>
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
}
