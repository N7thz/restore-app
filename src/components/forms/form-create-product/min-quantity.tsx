import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product-schema"
import { useFormContext } from "react-hook-form"

export const MinQuantityLabel = ({ index }: { index: number }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<InputCreateProductProps>()

	return (
		<>
			<Label htmlFor="minQuantity" className="w-full flex-col items-start">
				Minima Quantidade:
				<Input
					id="minQuantity"
					type="number"
					defaultValue={1}
					className={cn(
						errors.products?.[index]?.minQuantity && [
							"focus-visible:ring-destructive",
							"not-focus-visible:border-destructive",
						]
					)}
					{...register(`products.${index}.minQuantity`)}
				/>
			</Label>
			{errors.products?.[index]?.minQuantity && (
				<SpanErrorMessage
					message={errors.products?.[index]?.minQuantity?.message}
				/>
			)}
		</>
	)
}
