import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
    InputCreateProductProps
} from "@/schemas/create-product-exit-schema"
import { useFormContext } from "react-hook-form"

export const DescriptionLabel = ({ index }: { index: number }) => {

    const {
        register,
        formState: { errors }
    } = useFormContext<InputCreateProductProps>()

    return (
        <>
            <Label
                htmlFor="description"
                className="flex-col items-start">
                Descrição:
                <Textarea
                    id="description"
                    className={cn(
                        errors.products?.[index]?.description &&
                        [
                            "focus-visible:ring-destructive",
                            "not-focus-visible:border-destructive",
                        ]
                    )}
                    {...register(`products.${index}.description`)}
                />
            </Label>
            {
                errors.products?.[index]?.description &&
                <SpanErrorMessage
                    message={errors.products[index]?.description?.message}
                />
            }
        </>
    )
}
