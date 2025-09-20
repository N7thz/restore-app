import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product-exit-schema"
import { useFormContext } from "react-hook-form"

export const NameLabel = ({ index }: { index: number }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InputCreateProductProps>()

  return (
    <>
      <Label htmlFor="name" className="flex-col items-start">
        A quem foi entrege:
        <Input
          id="name"
          className={cn(
            errors.products?.[index]?.name && [
              "focus-visible:ring-destructive",
              "not-focus-visible:border-destructive",
            ]
          )}
          {...register(`products.${index}.name`)}
        />
      </Label>
      {errors.products?.[index]?.name && (
        <SpanErrorMessage message={errors.products[index]?.name?.message} />
      )}
    </>
  )
}
