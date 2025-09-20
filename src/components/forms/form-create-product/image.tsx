import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product-schema"
import { useFormContext } from "react-hook-form"

export const ImageLabel = ({ index }: { index: number }) => {

    const {
        register,
        formState: { errors },
    } = useFormContext<InputCreateProductProps>()

    return (
        <>
            <Label htmlFor="imageUrl" className="w-full flex-col items-start">
                Imagem:
                <Input
                    id="imageUrl"
                    placeholder="https://github.com/shadcn.png"
                    className={cn(
                        errors.products?.[index]?.imageUrl && [
                            "focus-visible:ring-destructive",
                            "not-focus-visible:border-destructive",
                        ]
                    )}
                    {...register(`products.${index}.imageUrl`)}
                />
            </Label>
            {errors.products?.[index]?.imageUrl && (
                <SpanErrorMessage
                    message={errors.products?.[index]?.imageUrl?.message}
                />
            )}
        </>
    )
}
