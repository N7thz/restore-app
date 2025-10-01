import { createProductEntry } from "@/actions/product-entry/create-product-entry"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
	InputCreateProductEntryProps,
	inputCreateProductEntrySchema,
	OutputCreateProductEntryProps,
	outputCreateProductEntrySchema,
} from "@/schemas/create-product-entry-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export function useFormCreateProductEntry() {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ["create-product-entry"],
		mutationFn: async (data: OutputCreateProductEntryProps) =>
			createProductEntry(data),
		onSuccess: ({ notification, productId }) => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return [notification]

					return [notification, ...oldData]
				}
			)

			toast({
				title: "Entrada de produto criada",
				description: "A entrada de produto foi criada com sucesso.",
				variant: "success",
				onAutoClose: () => push(`/products/${productId}`),
			})
		},
		onError: err => {
			console.log(err)

			toast({
				title: err.message,
				description: "Erro ao criar entrada de produto.",
				variant: "error",
			})
		},
	})

	const form = useForm<InputCreateProductEntryProps>({
		resolver: zodResolver(inputCreateProductEntrySchema),
	})

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = form

	function onSubmit({
		price,
		quantity,
		productId,
	}: InputCreateProductEntryProps) {
		const { data, error } = outputCreateProductEntrySchema.safeParse({
			price: Number(price),
			quantity: Number(quantity),
			productId,
		})

		if (error)
			return validateErrors<OutputCreateProductEntryProps>(error, setError)

		mutate(data)
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		errors,
		register,
		isPending,
		isSuccess,
	}
}
