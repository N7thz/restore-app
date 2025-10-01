import { SpanErrorMessage } from "@/components/span-error"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { OutputProductProps } from "@/schemas/product-object-schema"
import { useFormContext } from "react-hook-form"

export const CardFormUpdateProduct = () => {

	const {
		register,
		formState: { errors },
	} = useFormContext<OutputProductProps>()

	return (
		<Card>
			<CardContent className="space-y-4">
				<Label htmlFor="name" className="flex-col items-start">
					Nome do produto:
					<Input
						id="name"
						className={cn(
							errors.name && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
						{...register("name")}
					/>
				</Label>
				{errors.name && <SpanErrorMessage message={errors.name.message} />}
				<Label htmlFor="minQuantity" className="w-full flex-col items-start">
					Minima Quantidade:
					<Input
						id="minQuantity"
						type="number"
						defaultValue={1}
						className={cn(
							errors.minQuantity && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
						{...register("minQuantity")}
					/>
				</Label>
				{errors.minQuantity && (
					<SpanErrorMessage message={errors.minQuantity.message} />
				)}
				<Label htmlFor="imageUrl" className="w-full flex-col items-start">
					Imagem:
					<Input
						id="imageUrl"
						placeholder="https://github.com/shadcn.png"
						className={cn(
							errors.imageUrl && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							]
						)}
						{...register("imageUrl")}
					/>
				</Label>
				{errors.imageUrl && (
					<SpanErrorMessage message={errors.imageUrl.message} />
				)}
			</CardContent>
		</Card>
	)
}
