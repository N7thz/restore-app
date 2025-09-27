"use client"

import { findProductById } from "@/actions/products/find-product-by-id"
import { CardFormUpdateProduct } from "@/components/forms/form-update-product/card-form-update-product"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { queryKey } from "@/lib/query-keys"
import { OutputProductProps } from "@/schemas/product-object"
import { useQuery } from "@tanstack/react-query"
import { Loader2, RotateCcw } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { useFormUpdateProduct } from "./use-form-update-product"

export const FormUpdateProduct = ({ id }: { id: string }) => {
	const {
		data: product,
		isLoading,
		status,
		refetch,
	} = useQuery({
		queryKey: queryKey.findProductById(id),
		queryFn: () => findProductById(id),
	})

	if (isLoading) {
		return (
			<>
				<div className="space-y-4">
					<Separator />
					<CardContent className="size-full">
						<Card>
							<CardContent className="space-y-4">
								<Label className="flex-col items-start">
									Nome do produto:
									<Input readOnly />
								</Label>
								<Label className="w-full flex-col items-start">
									Preço:
									<Input readOnly />
								</Label>
								<Label className="w-full flex-col items-start">
									Quantidade:
									<Input readOnly />
								</Label>
								<Label className="w-full flex-col items-start">
									Minima Quantidade:
									<Input readOnly />
								</Label>
								<Label className="w-full flex-col items-start">
									Imagem:
									<Input readOnly />
								</Label>
							</CardContent>
						</Card>
					</CardContent>
					<Separator />
				</div>
				<CardFooter className="justify-end">
					<Button className="w-1/2" disabled>
						Confirmar
					</Button>
				</CardFooter>
			</>
		)
	}

	if (status === "error" || !product) {
		return (
			<Card className="border-none shadow-none">
				<CardHeader>
					<CardTitle>Não foi possivel carregar o produto</CardTitle>
					<CardAction>
						<Button
							variant={"secondary"}
							className="w-full"
							onClick={() => refetch()}>
							<RotateCcw className="group-hover:-rotate-360 transition-all" />
							Tentar novamente
						</Button>
					</CardAction>
				</CardHeader>
			</Card>
		)
	}

	return <UpdateProduct id={id} product={product} />
}

export const UpdateProduct = ({
	id,
	product,
}: {
	id: string
	product: OutputProductProps
}) => {
	const { form, isLoading, isSuccess, isPending, handleSubmit, onSubmit } =
		useFormUpdateProduct(id, product)

	return (
		<>
			<FormProvider {...form}>
				<form
					id="form-create-products"
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4">
					<Separator />
					<CardContent className="size-full">
						<CardFormUpdateProduct />
					</CardContent>
					<Separator />
				</form>
			</FormProvider>
			<CardFooter className="justify-end">
				<Button
					type="submit"
					form="form-create-products"
					className="w-1/2"
					disabled={isLoading || isSuccess}>
					{isPending ? <Loader2 className="animate-spin" /> : "Confirmar"}
				</Button>
			</CardFooter>
		</>
	)
}
