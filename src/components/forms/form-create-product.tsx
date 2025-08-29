"use client"

import { InputNumber } from "@/components/input-quantity"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    InputCreateProductProps,
    inputCreateProductSchema
} from "@/schemas/create-product"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

export const FormCreateProduct = () => {

    const form = useForm<InputCreateProductProps>({
        resolver: zodResolver(inputCreateProductSchema),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = form

    console.log(errors)

    function onSubmit(data: InputCreateProductProps) {
        alert(JSON.stringify(data, null, 2))
    }

    return (
        <FormProvider {...form}>
            <form
                id="form-create-products"
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardContent className="space-y-4">
                    <Label
                        htmlFor="name"
                        className="flex-col items-start">
                        Nome do produto:
                        <Input
                            id="name"
                            {...register("name")}
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
                                {...register("price")}
                            />
                        </Label>
                        <Label
                            htmlFor="quantity"
                            className="w-full flex-col items-start"
                        >
                            Quantidade:
                            <InputNumber
                                id="quantity"
                                {...register("quantity")}
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
                            {...register("imageUrl")}
                        />
                    </Label>
                </CardContent>
            </form>
        </FormProvider>
    )
}
