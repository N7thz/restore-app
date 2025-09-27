import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputProductExitObjectProps } from "@/schemas/product-exit-object"
import { useFormContext } from "react-hook-form"

export const NameLabel = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<InputProductExitObjectProps>()

	return (
		<>
			<Label htmlFor="name" className="flex-col items-start">
				A quem foi entrege:
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
		</>
	)
}
