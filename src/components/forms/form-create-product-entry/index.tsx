"use client"

import {
    createProductEntry
} from "@/actions/product-entry/create-product-entry"
import { SelectProduct } from "@/components/select-product"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import {
    AlertDialogAction,
    AlertDialogCancel
} from "@/components/ui/alert-dialog"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { validateErrors } from "@/lib/zod"
import {
    InputCreateProductEntryProps,
    InputCreateProductEntrySchema,
    OutputCreateProductEntryProps,
    outputCreateProductEntrySchema
} from "@/schemas/create-product-entry"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { FormProvider, useForm } from "react-hook-form"

export const FormCreateProductEntry = () => {

    const queryClient = useQueryClient()

    const { push } = useRouter()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["create-product-entry"],
        mutationFn: async (data: OutputCreateProductEntryProps) => createProductEntry(data),
        onSuccess: ({ notification, productId }) => {

            queryClient.setQueryData<Notification[]>(
                queryKey.findAllNotifications(),
                (oldData) => {

                    if (!oldData) return [notification]

                    return [notification, ...oldData]
                }
            )

            toast({
                title: "Entrada de produto criada",
                description: "A entrada de produto foi criada com sucesso.",
                variant: "success",
                onAutoClose: () => push(`/products/${productId}`)

            })
        },
        onError: (err) => {

            console.log(err)

            toast({
                title: err.message,
                description: "Erro ao criar entrada de produto.",
                variant: "error"
            })
        }
    })

    const form = useForm<InputCreateProductEntryProps>({
        resolver: zodResolver(InputCreateProductEntrySchema),
    })

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = form

    function onSubmit({
        price, quantity, productId
    }: InputCreateProductEntryProps) {

        const { data, error } = outputCreateProductEntrySchema.safeParse({
            price: Number(price),
            quantity: Number(quantity),
            productId
        })

        if (error)
            return validateErrors<OutputCreateProductEntryProps>(error, setError)

        mutate(data)
    }

    return (
        <>
            <FormProvider {...form}>
                <form
                    id="form-create-product-entry"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CardContent className="space-y-4 px-0">
                        <SelectProduct />
                        <Label htmlFor="price" className="flex-col items-start">
                            Preço:
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                className={cn(
                                    errors.price && [
                                        "focus-visible:ring-destructive",
                                        "not-focus-visible:border-destructive",
                                    ]
                                )}
                                {...register("price")}
                            />
                        </Label>
                        {errors.price && (
                            <SpanErrorMessage message={errors.price?.message} />
                        )}
                        <Label htmlFor="quantity" className="flex-col items-start">
                            Quantidade:
                            <Input
                                id="quantity"
                                type="number"
                                className={cn(
                                    errors.quantity && [
                                        "focus-visible:ring-destructive",
                                        "not-focus-visible:border-destructive",
                                    ]
                                )}
                                {...register("quantity")}
                            />
                        </Label>
                        {errors.price && (
                            <SpanErrorMessage message={errors.price?.message} />
                        )}
                    </CardContent>
                </form>
            </FormProvider>
            <Separator />
            <CardFooter className="gap-2">
                <AlertDialogCancel
                    variant={"destructive"}
                    className="w-1/2"
                    type="button"
                >
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                    type="submit"
                    form="form-create-product-entry"
                    variant={"default"}
                    className="w-1/2"
                    disabled={isPending || isSuccess}
                >
                    {
                        isPending || isSuccess
                            ? <Loader2 className="animate-spin" />
                            : "Confirmar"
                    }
                </AlertDialogAction>
            </CardFooter>
        </>
    )
}
