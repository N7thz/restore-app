import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
    InputCreateProductProps
} from "@/schemas/create-product-exit-schema"
import { useFormContext } from "react-hook-form"

export const RegionLabel = ({ index }: { index: number }) => {

    const {
        register,
        formState: { errors }
    } = useFormContext<InputCreateProductProps>()

    return (
        <>
            <Label
                htmlFor="region"
                className="flex-col items-start">
                Região:
                <Input
                    id="region"
                    className={cn(errors.products?.[index]?.region && [
                        "focus-visible:ring-destructive",
                        "not-focus-visible:border-destructive",
                    ])}
                    {...register(`products.${index}.region`)}
                />
            </Label>
            {
                errors.products?.[index]?.region &&
                <SpanErrorMessage
                    message={errors.products[index]?.region.message}
                />
            }
        </>
    )
}
