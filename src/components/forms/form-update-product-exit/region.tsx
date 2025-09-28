import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputProductExitObjectProps } from "@/schemas/product-exit-object"
import { useFormContext } from "react-hook-form"

export const RegionLabel = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<InputProductExitObjectProps>()

	return (
		<>
			<Label htmlFor="region" className="flex-col items-start">
				Região:
				<Input
					id="region"
					className={cn(
						errors.region && [
							"focus-visible:ring-destructive",
							"not-focus-visible:border-destructive",
						]
					)}
					{...register("region")}
				/>
			</Label>
			{errors.region && <SpanErrorMessage message={errors.region.message} />}
		</>
	)
}
