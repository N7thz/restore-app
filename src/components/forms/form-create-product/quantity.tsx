import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product-schema"
import { useFormContext } from "react-hook-form"

export const QuantityLabel = ({ index }: { index: number }) => {

    const {
        register,
        formState: { errors },
    } = useFormContext<InputCreateProductProps>()

    return (
        <>
            <Label htmlFor="quantity" className="flex-col items-start">
                Quantidade:
                <Input
                    id="quantity"
                    type="number"
                    className={cn(
                        errors.products?.[index]?.productEntry?.quantity && [
                            "focus-visible:ring-destructive",
                            "not-focus-visible:border-destructive",
                        ]
                    )}
                    {...register(`products.${index}.productEntry.quantity`)}
                />
            </Label>
            {errors.products?.[index]?.productEntry?.quantity && (
                <SpanErrorMessage message={errors.products?.[index]?.productEntry?.quantity.message} />
            )}
        </>
    )
}
