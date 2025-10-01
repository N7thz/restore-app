import {
	createManyProducts,
	CreateManyProductsProps
} from "@/actions/products/create-many-products"
import { queryClient } from "@/components/theme-provider"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
	InputCreateProductProps,
	inputCreateProductSchema,
	OutputCreateProductProps,
	outputCreateProductSchema,
} from "@/schemas/create-product-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "@/components/toast"

export function useFormCreateProduct() {

	const { push } = useRouter()

	const { isPending, isSuccess, mutate } = useMutation({
		mutationKey: queryKey.createManyProducts(),
		mutationFn: ({ products }: OutputCreateProductProps) =>
			createManyProducts({ products }),
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

	const form = useForm<InputCreateProductProps>({
		resolver: zodResolver(inputCreateProductSchema),
		defaultValues: {
			products: [{
				productEntry: {
					productId: "."
				}
			}],
		},
	})

	const {
		register,
		setError,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form

	const isLoading = isPending || isSubmitting

	const { append, remove, fields } = useFieldArray({
		name: "products",
		control,
	})

	function appendProduct() {
		append({
			name: "",
			minQuantity: "1",
			imageUrl: "",
			productEntry: {
				price: "",
				quantity: "",
				productId: "",
			}
		})
	}

	function removeAllProducts() {
		for (let i = fields.length - 1; i >= 0; i--) {
			if (i !== 0) remove(i)
		}
	}

	function validateFormData({ products }: InputCreateProductProps) {
		const transformedData = {
			products: products.map(({
				name,
				minQuantity,
				imageUrl,
				productEntry: {
					price, productId, quantity
				}
			}) => ({
				name,
				minQuantity: Number(minQuantity),
				imageUrl: imageUrl !== "" ? imageUrl : null,
				productEntry: {
					price: Number(price),
					quantity: Number(quantity),
					productId,
				}
			})),
		}

		return outputCreateProductSchema.safeParse(transformedData)
	}

	async function onSubmit(formData: InputCreateProductProps) {

		const { data, error } = validateFormData(formData)

		if (error) {

			toast({
				title: error.message,
				description: error.name,
				variant: "error"
			})

			return validateErrors<OutputCreateProductProps>(error, setError)
		}


		const { products } = data

		mutate({ products })
	}

	return {
		form,
		fields,
		errors,
		isLoading,
		isSuccess,
		handleSubmit,
		onSubmit,
		appendProduct,
		removeAllProducts,
		remove,
		register,
	}
}
