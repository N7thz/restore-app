import { createManyProducts } from "@/actions/products/create-many-products"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { OutputCreateProductProps } from "@/schemas/create-product-schema"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Notification } from "@prisma/client"

export function useCreateManyProducts() {
	const { push } = useRouter()

	const mutation = useMutation({
		mutationKey: queryKey.createManyProducts(),
		mutationFn: ({ products }: OutputCreateProductProps) =>
			createManyProducts(products),
		onSuccess: async ({ notifications }) => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return notifications

					return [...oldData, ...notifications]
				}
			)

			toast({
				title: "Produtos cadastrados",
				description: "O cadastro foi feito com sucesso.",
				onAutoClose: () => push("/home"),
			})
		},
		onError: error => {
			console.error(error)

			toast({
				title: error.message,
				variant: "error",
				description: "Não foi possivel cadastrar o produto.",
				duration: 5000,
			})
		},
	})

	return mutation
}
