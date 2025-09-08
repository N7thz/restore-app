import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputProductExitObjectProps } from "@/schemas/product-exit-object"
import { useFormContext } from "react-hook-form"

export const QuantityLabel = () => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<InputProductExitObjectProps>()

  return (
    <>
      <Label htmlFor="quantity" className="flex-col items-start">
        Quantidade:
        <Input
          id="quantity"
          type="number"
          step={0.5}
          className={cn(
            errors.quantity && [
              "focus-visible:ring-destructive",
              "not-focus-visible:border-destructive",
            ]
          )}
          {...register("quantity")}
        />
      </Label>
      {errors.quantity && (
        <SpanErrorMessage message={errors.quantity.message} />
      )}
    </>
  )
}
