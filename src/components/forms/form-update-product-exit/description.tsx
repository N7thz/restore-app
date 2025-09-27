import { SpanErrorMessage } from "@/components/span-error"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { InputProductExitObjectProps } from "@/schemas/product-exit-object"
import { useFormContext } from "react-hook-form"

export const DescriptionLabel = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<InputProductExitObjectProps>()

	return (
		<>
			<Label htmlFor="description" className="flex-col items-start">
				Descrição:
				<Textarea
					id="description"
					className={cn(
						errors.description && [
							"focus-visible:ring-destructive",
							"not-focus-visible:border-destructive",
						]
					)}
					{...register("description")}
				/>
			</Label>
			{errors.description && (
				<SpanErrorMessage message={errors.description.message} />
			)}
		</>
	)
}
