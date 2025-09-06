"use client"

import { findProductsExitById } from "@/actions/product-exit/find-products-exit-by-id"
import { DatePickerUpdate } from "@/components/date-picker-update"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { queryKey } from "@/lib/query-keys"
import {
    OutputProductExitObjectProps
} from "@/schemas/product-exit-object"
import { Product } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { DescriptionLabel } from "./description"
import { QuantityLabel } from "./quantity"
import { RegionLabel } from "./region"
import { SelectProductUpdate } from "./select-product-update"
import { useFormUpdateProductExit } from "./use-form-update-product"
import { UsernameLabel } from "./user-name"

export const FormUpdateProductExit = ({ id }: { id: string }) => {

    const { data: product, isLoading, status } = useQuery({
        queryKey: queryKey.findProductExitById(id),
        queryFn: () => findProductsExitById(id)
    })

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (status === "error" || !product) {
        return (
            <div>
                Error
            </div>
        )
    }

    return (
        <UpdateProductExit
            id={id}
            product={product}
        />
    )
}

export const UpdateProductExit = ({
    id,
    product
}: {
    id: string,
    product: OutputProductExitObjectProps & { product: Product }
}) => {

    const {
        form,
        isLoading,
        isSuccess,
        isPending,
        handleSubmit,
        onSubmit,
    } = useFormUpdateProductExit(id, product)

    return (
        <>
            <FormProvider {...form}>
                <form
                    id="form-update-product-exit"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Separator />
                    <CardContent className="size-full space-y-4">
                        <DatePickerUpdate />
                        <UsernameLabel />
                        <QuantityLabel />
                        <RegionLabel />
                        <SelectProductUpdate />
                        <DescriptionLabel />
                    </CardContent>
                    <Separator />
                </form>
            </FormProvider>
            <CardFooter className="justify-end">
                <Button
                    type="submit"
                    form="form-update-product-exit"
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