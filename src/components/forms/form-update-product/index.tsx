"use client"

import { findProductById } from "@/actions/products/find-product-by-id"
import {
    CardFormUpdateProduct
} from "@/components/forms/form-update-product/card-form-update-product"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { queryKey } from "@/lib/query-keys"
import {
    InputProductProps,
    inputProductObject
} from "@/schemas/product-object"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { formatError } from "zod"
import { useFormUpdateProduct } from "./use-form-update-product"

export const FormUpdateProduct = ({ id }: { id: string }) => {

    const { data, isLoading, status } = useQuery({
        queryKey: queryKey.findProductById(id),
        queryFn: () => findProductById(id)
    })

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (status === "error" || !data) {
        return (
            <div>
                Error
            </div>
        )
    }

    const { name, price, quantity, minQuantity, imageUrl } = data

    const { data: product, error } = inputProductObject.safeParse({
        name,
        price: price.toString(),
        quantity: quantity.toString(),
        minQuantity: minQuantity.toString(),
        imageUrl
    })

    if (error) {
        return (
            <div>
                <pre>
                    {JSON.stringify(formatError(error), null, 2)}
                </pre>
            </div>
        )
    }

    return (
        <UpdateProduct
            id={id}
            product={product}
        />
    )
}

export const UpdateProduct = ({
    id,
    product
}: { id: string, product: InputProductProps }) => {

    const {
        form,
        isLoading,
        isSuccess,
        isPending,
        handleSubmit,
        onSubmit,
    } = useFormUpdateProduct(id, product)

    return (
        <>
            <FormProvider {...form}>
                <form
                    id="form-create-products"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Separator />
                    <CardContent className="size-full">
                        <CardFormUpdateProduct />
                    </CardContent>
                    <Separator />
                </form>
            </FormProvider>
            <CardFooter className="justify-end">
                <Button
                    type="submit"
                    form="form-create-products"
                    className="w-1/2"
                    disabled={isLoading || isSuccess}
                >
                    {
                        isPending
                            ? <Loader2 className="animate-spin" />
                            : "Confirmar"
                    }
                </Button>
            </CardFooter>
        </>
    )
}

