import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
    InputCreateProductProps
} from "@/schemas/create-product-exit-schema"
import { useFormContext } from "react-hook-form"

export const UsernameLabel = ({ index }: { index: number }) => {

    const {
        register,
        formState: { errors }
    } = useFormContext<InputCreateProductProps>()

    return (
        <>
            <Label
                htmlFor="username"
                className="flex-col items-start">
                A quem foi entrege:
                <Input
                    id="username"
                    className={cn(errors.products?.[index]?.username && [
                        "focus-visible:ring-destructive",
                        "not-focus-visible:border-destructive",
                    ])}
                    {...register(`products.${index}.username`)}
                />
            </Label>
            {
                errors.products?.[index]?.username &&
                <SpanErrorMessage
                    message={errors.products[index]?.username?.message}
                />
            }
        </>
    )
}
