import { useCreateManyProducts } from "@/hooks/use-create-many-products"
import { validateErrors } from "@/lib/zod"
import {
  InputCreateProductProps,
  inputCreateProductSchema,
  OutputCreateProductProps,
  outputCreateProductSchema,
} from "@/schemas/create-product-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { log, table } from "console"
import { useFieldArray, useForm } from "react-hook-form"

export function useFormCreateProduct() {

  const { isPending, isSuccess, mutate } = useCreateManyProducts()

  const form = useForm<InputCreateProductProps>({
    resolver: zodResolver(inputCreateProductSchema),
    defaultValues: {
      products: [{}],
    },
  })

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form

  const isLoading = isPending || isSubmitting

  const { append, remove, fields } = useFieldArray({
    name: "products",
    control,
  })

  function appendProduct() {
    append({
      name: "",
      minQuantity: "1",
      imageUrl: "",
    })
  }

  function removeAllProducts() {
    for (let i = fields.length - 1; i >= 0; i--) {
      if (i !== 0) remove(i)
    }
  }

  function validateFormData({ products }: InputCreateProductProps) {
    const transformedData = {
      products: products.map(
        ({ name, minQuantity, imageUrl }) => ({
          name,
          minQuantity: Number(minQuantity),
          imageUrl: imageUrl !== "" ? imageUrl : null,
        })
      ),
    }

    return outputCreateProductSchema.safeParse(transformedData)
  }

  async function onSubmit(data: InputCreateProductProps) {

    const { data: products, error } = validateFormData(data)

    if (error) return validateErrors<OutputCreateProductProps>(error, setError)

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
    register,
  }
}
