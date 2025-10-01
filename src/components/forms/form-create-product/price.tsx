import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product-schema"
import { useFormContext } from "react-hook-form"

export const PriceLabel = ({ index }: { index: number }) => {

    const {
        register,
        formState: { errors },
    } = useFormContext<InputCreateProductProps>()

    return (
        <>
            <Label htmlFor="price" className="flex-col items-start">
                Preço:
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    className={cn(
                        errors.products?.[index]?.productEntry?.price && [
                            "focus-visible:ring-destructive",
                            "not-focus-visible:border-destructive",
                        ]
                    )}
                    {...register(`products.${index}.productEntry.price`)}
                />
            </Label>
            {errors.products?.[index]?.productEntry?.price && (
                <SpanErrorMessage message={errors.products?.[index]?.productEntry?.price.message} />
            )}
        </>
    )
}
