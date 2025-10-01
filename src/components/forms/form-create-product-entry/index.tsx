"use client"

import { SelectProduct } from "@/components/select-product"
import { SpanErrorMessage } from "@/components/span-error"
import { 
	AlertDialogAction, AlertDialogCancel
} from "@/components/ui/alert-dialog"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { useFormCreateProductEntry } from "./use-form-create-product-entry"

export const FormCreateProductEntry = () => {
	const {
		form,
		handleSubmit,
		onSubmit,
		errors,
		register,
		isPending,
		isSuccess,
	} = useFormCreateProductEntry()

	return (
		<>
			<FormProvider {...form}>
				<form id="form-create-product-entry" onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-4 px-0">
						<SelectProduct />
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
						{errors.price && (
							<SpanErrorMessage message={errors.price?.message} />
						)}
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
						{errors.price && (
							<SpanErrorMessage message={errors.price?.message} />
						)}
					</CardContent>
				</form>
			</FormProvider>
			<Separator />
			<CardFooter className="gap-2">
				<AlertDialogCancel
					variant={"destructive"}
					className="w-1/2"
					type="button">
					Cancelar
				</AlertDialogCancel>
				<AlertDialogAction
					type="submit"
					form="form-create-product-entry"
					variant={"default"}
					className="w-1/2"
					disabled={isPending || isSuccess}>
					{isPending || isSuccess ? (
						<Loader2 className="animate-spin" />
					) : (
						"Confirmar"
					)}
				</AlertDialogAction>
			</CardFooter>
		</>
	)
}
