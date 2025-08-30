import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Edit, Ellipsis, Loader2, Trash } from "lucide-react"
import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { deleteProduct } from "@/actions/delete-prduct"
import { toast } from "@/components/toast"
import { queryClient } from "@/components/theme-provider"

export const DialogDeleteProduct = ({ id }: { id: string }) => {

    const [open, setOpen] = useState(false)

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["delete-product"],
        mutationFn: () => deleteProduct(id),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ["find-all-products"]
        }),
        onError: (err) => {
            console.error(err)
            toast({
                title: "Não foi possivel excluir o produto",
                variant: "error"
            })
        }
    })

    async function onClick() {

    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger className={cn([
                "w-full hover:bg-accent",
                "dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                "focus:bg-accent focus:text-accent-foreground",
                "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive"
            ])}>
                <Trash />
                Excluir produto
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        A exclusão de um produto não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate()}>
                        {
                            isPending
                                ? <Loader2 className="animate-spin" />
                                : "Confirmar"
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
