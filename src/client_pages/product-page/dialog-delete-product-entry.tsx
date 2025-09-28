import { deleteProductEntry } from "@/actions/product-entry/delete-product-entry"
import { deleteProduct } from "@/actions/products/delete-product"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
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
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { Notification, Product, ProductEntry } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Trash } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export const DialogDeleteProductEntry = ({ id }: { id: string }) => {
	const pathname = usePathname()
	const { push } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ["delete-product-entry"],
		mutationFn: () => deleteProductEntry(id),
		onSuccess: ({ notification, product }) => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return [notification]

					return [...oldData, notification]
				}
			)

			queryClient.setQueryData<Product>(
				queryKey.findProductById(product.id),
				product
			)

			toast({
				title: "A entrada de produto foi excluido com sucesso",
				description: notification.description,
			})
		},
		onError: err => {
			console.error(err)

			toast({
				title: "Não foi possivel excluir a entrada de produto",
				description: err.message,
				variant: "error",
			})
		},
	})

	return (
		<AlertDialog>
			<AlertDialogTrigger
				className={cn([
					"w-full hover:bg-accent",
					"dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
					"focus:bg-accent focus:text-accent-foreground",
					"data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive",
				])}>
				<Trash />
				Excluir
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
					<AlertDialogDescription>
						Tem certeza que deseja excluir uma entrada de produto?.Essa ação não
						pode ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => mutate()}>
						{isPending ? <Loader2 className="animate-spin" /> : "Confirmar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
