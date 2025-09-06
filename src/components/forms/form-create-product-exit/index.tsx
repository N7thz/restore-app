"use client"

import {
    createManyProductsExist
} from "@/actions/product-exit/create-many-product-exit"
import { findProductById } from "@/actions/products/find-product-by-id"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { validateErrors } from "@/lib/zod"
import {
    InputCreateProductProps,
    OutputCreateProductProps,
    inputCreateProductExitSchema,
    outputCreateProductExitSchema
} from "@/schemas/create-product-exit-schema"
import { OutputProductExitObjectProps } from "@/schemas/product-exit-object"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { CardFormCreateProductExit } from "./card-form-create-product-exit"
import { queryClient } from "@/components/theme-provider"
import { queryKey } from "@/lib/query-keys"
import { Notification } from "@prisma/client"
import { toast } from "@/components/toast"
import { useRouter } from "next/navigation"

export const FormCreateProductExit = () => {

    const { push } = useRouter()

    const form = useForm<InputCreateProductProps>({
        resolver: zodResolver(inputCreateProductExitSchema),
        defaultValues: {
            products: [{}]
        }
    })

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: queryKey.createProdcuctExit(),
        mutationFn: (data: OutputCreateProductProps) => createManyProductsExist(data),
        onSuccess: ({ notifications }) => {

            queryClient.setQueryData<Notification[]>(
                queryKey.findAllNotifications(),
                (oldData) => {

                    if (!oldData) return notifications

                    return [...oldData, ...notifications]
                }
            )

            toast({
                title: "Saída de produtos cadastradas",
                description: "A saída de produtos foi efetuada com sucesso.",
                onAutoClose: () => push("/")
            })
        },
        onError: () => toast({
            title: "Não foi possivel cadastrar saída de produto",
            variant: "error",
            description: "Tente novamente mais tarde.",
        })
    })

    const {
        control,
        setError,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    const { append, remove, fields } = useFieldArray({
        name: "products",
        control
    })

    const isLoading = isPending || isSubmitting

    function validateFormData({ products }: InputCreateProductProps) {

        const transformedData = {
            products: products.map(({
                quantity,
                description,
                ...rest
            }) => ({
                ...rest,
                quantity: Number(quantity),
                description: description !== "" ? description : null,
            }))
        }

        return outputCreateProductExitSchema.safeParse(transformedData)
    }

    async function validateQuantity({
        productId, quantity, index
    }: OutputProductExitObjectProps & { index: number }) {

        const product = await findProductById(productId)

        if (quantity > product.quantity) {
            return setError(`products.${index}.quantity`, {
                message: `Quantidade de saída excede o estoque disponível que é ${product.quantity}`
            })
        }
    }

    async function onSubmit({ products }: InputCreateProductProps) {

        const { data, error } = validateFormData({ products })

        if (error)
            return validateErrors<OutputCreateProductProps>(error, setError)

        data.products.map(async (productExit, index) => {
            validateQuantity({ ...productExit, index })
        })

        mutate(data)
    }

    function appendProduct() {
        append({
            createdAt: new Date(),
            description: null,
            username: "",
            productId: "",
            quantity: "0",
            region: ""
        })
    }

    function removeAllProducts() {
        for (let i = fields.length - 1; i >= 0; i--) {
            if (i !== 0) remove(i)
        }
    }

    return (
        <>
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
                            disabled={isLoading || isSuccess}
                            onClick={appendProduct}
                        >
                            Adicionar Produto
                        </Button>
                        <Button
                            type="button"
                            variant={"destructive"}
                            className="w-1/2"
                            disabled={fields.length === 1}
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
                                fields.map(({ id }, index) => (
                                    <CardFormCreateProductExit
                                        key={id}
                                        isLoading={isLoading}
                                        isSuccess={isSuccess}
                                        fields={fields}
                                        index={index}
                                        remove={remove}
                                    />
                                ))
                            }
                        </CardContent>
                    </ScrollArea>
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
                        isLoading
                            ? <Loader2 className="animate-spin" />
                            : "Confirmar"
                    }
                </Button>
            </CardFooter>
        </>
    )
}
