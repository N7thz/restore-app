import { useCreateManyProducts } from "@/hooks/use-create-many-products"
import { validateErrors } from "@/lib/zod"
import {
    InputCreateProductProps,
    inputCreateProductSchema,
    OutputCreateProductProps,
    outputCreateProductSchema,
} from "@/schemas/create-product-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { ZodError } from "zod"

export function useFormCreateProduct() {

    const { isPending, isSuccess, mutate } = useCreateManyProducts()

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
            price: "1",
            quantity: "1",
            minQuantity: "1",
            imageUrl: null
        })
    }

    function removeAllProducts() {
        for (let i = fields.length - 1; i >= 0; i--) {
            if (i !== 0) remove(i)
        }
    }

    function validateFormData({ products }: InputCreateProductProps) {
        const transformedData = {
            products: products.map(({
                name,
                price,
                quantity,
                minQuantity,
                imageUrl
            }) => ({
                name,
                price: Number(price),
                quantity: Number(quantity),
                minQuantity: Number(minQuantity),
                imageUrl: imageUrl !== "" ? imageUrl : null
            }))
        }

        return outputCreateProductSchema.safeParse(transformedData)
    }

    async function onSubmit(data: InputCreateProductProps) {

        const { data: products, error } = validateFormData(data)

        if (error)
            return validateErrors<OutputCreateProductProps>(error, setError)

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