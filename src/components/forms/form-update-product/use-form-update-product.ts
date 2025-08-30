import { updateProduct } from "@/actions/products/update-product"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKeys } from "@/lib/query-keys"
import {
    InputProductProps,
    inputProductSchema,
    OutputProductProps,
    outputProductSchema
} from "@/schemas/product-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ZodError } from "zod"

export function useFormUpdateProduct(
    id: string,
    {
        name,
        price,
        imageUrl,
        quantity,
        minQuantity,
    }: InputProductProps
) {

    const { push } = useRouter()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: queryKeys.updateProduct(id),
        mutationFn: (formData: OutputProductProps) => updateProduct(id, formData),
        onSuccess: ({ notification }) => {

            queryClient.setQueryData<Notification[]>(
                queryKeys.findAllNotifications(),
                (oldData) => {

                    if (!oldData) return [notification]

                    return [...oldData, notification]
                }
            )

            toast({
                title: "Produto atualizado",
                description: "O produto foi atualizado com sucesso.",
                onAutoClose: () => push("/")
            })
        }
    })

    const form = useForm<InputProductProps>({
        resolver: zodResolver(inputProductSchema),
        defaultValues: {
            name,
            price,
            imageUrl,
            quantity,
            minQuantity,
        }
    })

    const {
        setError,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = form

    const isLoading = isPending || isSubmitting

    function validateErrors(error: ZodError<{
        name: string
        price: number
        quantity: number
        imageUrl: string | null
    }>) {

        error._zod.def.map((error) => {

            const path = error.path.join(".") as
                "name" | "price" | "quantity" | "minQuantity" | "imageUrl" | `root.${string}` | "root"

            const message = error.message

            console.log(path, errors)

            setError(path, { message })
        })
    }

    function onSubmit({
        name,
        price,
        imageUrl,
        quantity,
        minQuantity,
    }: InputProductProps) {

        const { data, error } = outputProductSchema.safeParse({
            name,
            price: Number(price),
            quantity: Number(quantity),
            minQuantity: Number(minQuantity),
            imageUrl: imageUrl !== "" ? imageUrl : null,
        })

        if (error) return validateErrors(error)

        mutate(data)
    }

    return {
        form,
        isLoading,
        isSuccess,
        isPending,
        handleSubmit,
        onSubmit,
    }
}