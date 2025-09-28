import { updateProductEntry } from "@/actions/product-entry/update-product-entry"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { validateErrors } from "@/lib/zod"
import {
	InputCreateProductEntryProps,
	inputCreateProductEntrySchema,
	OutputCreateProductEntryProps,
	outputCreateProductEntrySchema,
} from "@/schemas/create-product-entry"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification, Product, ProductEntry } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"

export const FormUpdateProductEntry = ({
	productEntry: { productId, price, quantity, id },
	name,
}: {
	productEntry: ProductEntry
	name: string
}) => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ["update-product-entry"],
		mutationFn: (formData: OutputCreateProductEntryProps) =>
			updateProductEntry(id, formData),
		onSuccess: ({ notification, product }) => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return [notification]

					return [notification, ...oldData]
				}
			)

			queryClient.setQueryData(queryKey.findProductById(productId), product)

			toast({
				title: "Entrada de produto atualizada",
				description: "A entrada de produto foi atualizada com sucesso.",
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

	const form = useForm({
		defaultValues: {
			price: price.toString(),
			quantity: quantity.toString(),
			productId,
		},
		resolver: zodResolver(inputCreateProductEntrySchema),
	})

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = form

	async function onSubmit({
		price,
		quantity,
		productId,
	}: InputCreateProductEntryProps) {
		const { data, error } = outputCreateProductEntrySchema.safeParse({
			price: Number(price),
			quantity: Number(quantity),
			productId,
		})

		if (error) {
			return validateErrors<OutputCreateProductEntryProps>(error, setError)
		}

		mutate(data)
	}

	return (
		<>
			<FormProvider {...form}>
				<form
					id="form-update-product-entry"
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4">
					<Input readOnly value={name} />
					<Label htmlFor="price" className="flex-col items-start">
						Preço:
						<Input
							id="price"
							type="number"
							step="0.01"
							className={cn(
								errors.price && [
									"focus-visible:ring-destructive",
									"not-focus-visible:border-destructive",
								]
							)}
							{...register("price")}
						/>
					</Label>
					{errors.price && <SpanErrorMessage message={errors.price?.message} />}
					<Label htmlFor="quantity" className="flex-col items-start">
						Quantidade:
						<Input
							id="quantity"
							type="number"
							className={cn(
								errors.quantity && [
									"focus-visible:ring-destructive",
									"not-focus-visible:border-destructive",
								]
							)}
							{...register("quantity")}
						/>
					</Label>
					{errors.price && <SpanErrorMessage message={errors.price?.message} />}
				</form>
			</FormProvider>
			<AlertDialogFooter>
				<AlertDialogCancel type="button" variant={"destructive"}>
					Cancelar
				</AlertDialogCancel>
				<AlertDialogAction
					variant={"default"}
					type="submit"
					form="form-update-product-entry"
					disabled={isSubmitting}>
					Confirmar
				</AlertDialogAction>
			</AlertDialogFooter>
		</>
	)
}
