import { createManyProducts } from "@/actions/products/create-many-products"
import { toast } from "@/components/toast"
import {
    InputCreateProductProps,
    inputCreateProductSchema,
    OutputCreateProductProps,
    productInputToOutput
} from "@/schemas/create-product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"
import { ZodError } from "zod"

export function useFormCreateProduct() {

    const { push } = useRouter()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["create-many-products"],
        mutationFn: ({ products }: OutputCreateProductProps) => createManyProducts(products),
        onSuccess: () => toast({
            title: "Produtos cadastrados",
            description: "O cadastro foi feito com sucesso.",
            onAutoClose: () => push("/")
        }),
        onError: (error) => {
            console.error(error)
            toast({
                title: error.message,
                variant: "error",
                description: "Não foi possivel cadastrar o produto.",
                duration: 5000
            })
        }
    })

    const form = useForm<InputCreateProductProps>({
        resolver: zodResolver(inputCreateProductSchema),
        defaultValues: {
            products: [{}]
        }
    })

    const {
        setError,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = form

    const isLoading = isPending || isSubmitting

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

    function validateErrors(error: ZodError<{
        products: {
            name: string;
            price: number;
            quantity: number;
            imageUrl: string | null;
        }[];
    }>) {

        error._zod.def.map((error) => {

            const path = error.path.join(".") as
                `products.${number}.name` |
                `products.${number}.price` |
                `products.${number}.quantity` |
                `products.${number}.imageUrl`

            const message = error.message

            console.log({ path, message })

            setError(path, { message })
        })
    }

    async function onSubmit(data: InputCreateProductProps) {

        const { data: products, error } = productInputToOutput(data)

        if (error) return validateErrors(error)

        mutate(products)
    }

    return {
        form,
        fields,
        errors,
        isLoading,
        isSuccess,
        handleSubmit,
        onSubmit,
        appendProduct,
        removeAllProducts,
        remove,
    }
}