import { SpanErrorMessage } from "@/components/span-error"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product"
import { X } from "lucide-react"
import { useFormContext } from "react-hook-form"

type CardFormCreateProductProps = {
    fields: unknown[]
    index: number
    remove: (index: number) => void
}

export const CardFormCreateProduct = ({
    fields, index, remove
}: CardFormCreateProductProps) => {

    const {
        register,
        formState: { errors }
    } = useFormContext<InputCreateProductProps>()

    return (
        <Card>
            <CardHeader>
                <CardAction>
                    <Button
                        type="button"
                        variant={"outline"}
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                    >
                        <X />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
                <Label
                    htmlFor="name"
                    className="flex-col items-start">
                    Nome do produto:
                    <Input
                        id="name"
                        className={cn(
                            errors.products?.[index]?.name &&
                            [
                                "focus-visible:ring-destructive",
                                "not-focus-visible:border-destructive",
                            ]
                        )}
                        {...register(`products.${index}.name`)}
                    />
                </Label>
                {
                    errors.products?.[index]?.name &&
                    <SpanErrorMessage
                        message={errors.products[index].name.message}
                    />
                }
                <div className="grid grid-cols-2 gap-2 w-full">
                    <Label
                        htmlFor="quantity"
                        className="w-full flex-col items-start"
                    >
                        Quantidade:
                        <Input
                            type="number"
                            defaultValue={1}
                            className={cn(
                                errors.products?.[index]?.price &&
                                [
                                    "focus-visible:ring-destructive",
                                    "not-focus-visible:border-destructive",
                                ]
                            )}
                            {...register(`products.${index}.price`)}
                        />
                    </Label>
                    <Label
                        htmlFor="quantity"
                        className="w-full flex-col items-start"
                    >
                        Quantidade:
                        <Input
                            id="quantity"
                            type="number"
                            step={0.1}
                            defaultValue={0.1}
                            className={cn(
                                errors.products?.[index]?.quantity &&
                                [
                                    "focus-visible:ring-destructive",
                                    "not-focus-visible:border-destructive",
                                ]
                            )}
                            {...register(`products.${index}.quantity`)}
                        />
                    </Label>
                    {
                        errors.products?.[index]?.price &&
                        <SpanErrorMessage
                            message={errors.products[index].price.message}
                        />
                    }
                    {
                        errors.products?.[index]?.quantity &&
                        <SpanErrorMessage
                            message={errors.products[index].quantity.message}
                        />
                    }
                </div>
                <Label
                    htmlFor="imageUrl"
                    className="w-full flex-col items-start"
                >
                    Imagem:
                    <Input
                        id="imageUrl"
                        placeholder="https://github.com/shadcn.png"
                        className={cn(
                            errors.products?.[index]?.imageUrl &&
                            [
                                "focus-visible:ring-destructive",
                                "not-focus-visible:border-destructive",
                            ]
                        )}
                        {...register(`products.${index}.imageUrl`)}
                    />
                </Label>
                {
                    errors.products?.[index]?.imageUrl &&
                    <SpanErrorMessage
                        message={errors.products[index].imageUrl.message}
                    />
                }

            </CardContent>
        </Card>
    )
}

