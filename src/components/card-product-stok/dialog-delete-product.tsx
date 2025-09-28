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
import { Notification, Product } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Trash } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export const DialogDeleteProduct = ({ id }: { id: string }) => {
	const pathname = usePathname()
	const { push } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: queryKey.deleteProduct(),
		mutationFn: () => deleteProduct(id),
		onSuccess: ({ notification, productDeleted }) => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return [notification]

					return [...oldData, notification]
				}
			)

			queryClient.setQueryData<Product[]>(
				queryKey.findAllProducts(),
				oldData => {
					if (!oldData) return [productDeleted]

					const productsFilterd = oldData.filter(
						({ id }) => id !== productDeleted.id
					)

					return productsFilterd
				}
			)

			toast({
				title: "A produto foi excluido com sucesso",
				description: notification.description,
				onAutoClose: () => {
					if (pathname.startsWith("/products")) {
						push("/products")
					}
				},
			})
		},
		onError: err => {
			console.error(err)

			toast({
				title: "Não foi possivel excluir o produto",
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
						A exclusão de um produto também ira acarretar na exclusão de suas
						saidas.Essa ação não pode ser desfeita.
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
