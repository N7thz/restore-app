"use client"

import { InputNumber } from "@/components/input-quantity"
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    InputCreateProductProps,
    inputCreateProductSchema,
    productInputToOutput
} from "@/schemas/create-product"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ZodError } from "zod"

export const FormCreateProduct = () => {

    const form = useForm<InputCreateProductProps>({
        resolver: zodResolver(inputCreateProductSchema),
        defaultValues: {
            products: [{}]
        }
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid }
    } = form

    const { append, remove, fields } = useFieldArray({
        name: "products",
        control
    })

    function appendProduct() {
        append({
            name: "",
            price: "0",
            quantity: "0",
            imageUrl: null
        })
    }

    function removeAllProducts() {
        for (let i = fields.length - 1; i >= 0; i--) {
            if (i !== 0) remove(i)
        }
    }

    function validateErrors({  }: ZodError<{
        products: {
            name: string;
            price: number;
            quantity: number;
            imageUrl: string | null;
        }[];
    }>) {

    }

    function onSubmit(data: InputCreateProductProps) {

        const { data: products, error } = productInputToOutput(data)

        console.log(error)
    }

    return (
        <FormProvider {...form}>
            <form
                id="form-create-products"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <CardFooter className="justify-between gap-2">
                    <Button
                        type="button"
                        variant={"outline"}
                        className="w-1/2"
                        onClick={appendProduct}
                    >
                        Adicionar Produto
                    </Button>
                    <Button
                        type="button"
                        variant={"destructive"}
                        className="w-1/2"
                        onClick={removeAllProducts}
                    >
                        Remover todos
                    </Button>
                </CardFooter>
                <Separator />
                <ScrollArea className="h-[400px] overflow-hidden">
                    <ScrollBar />
                    <CardContent className="size-full space-y-4">
                        {
                            fields.map((_, index) => (
                                <Card key={index}>
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
                                                {...register(`products.${index}.name`)}
                                            />
                                        </Label>
                                        <div className="flex gap-4">
                                            <Label
                                                htmlFor="price"
                                                className="w-full flex-col items-start"
                                            >
                                                Preço:
                                                <InputNumber
                                                    id="price"
                                                    step={0.1}
                                                    {...register(`products.${index}.price`)}
                                                />
                                            </Label>
                                            <Label
                                                htmlFor="quantity"
                                                className="w-full flex-col items-start"
                                            >
                                                Quantidade:
                                                <InputNumber
                                                    id="quantity"
                                                    {...register(`products.${index}.quantity`)}
                                                />
                                            </Label>
                                        </div>
                                        <Label
                                            htmlFor="imageUrl"
                                            className="w-full flex-col items-start"
                                        >
                                            Imagem:
                                            <Input
                                                id="imageUrl"
                                                placeholder="https://github.com/shadcn.png"
                                                {...register(`products.${index}.imageUrl`)}
                                            />
                                        </Label>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </CardContent>
                </ScrollArea>
                <Separator />
            </form>
        </FormProvider>
    )
}
