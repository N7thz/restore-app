import { createManyProductsExit } from "@/actions/products-exit/create-many-product-exit"
import { findProductById } from "@/actions/products/find-product-by-id"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
  InputCreateProductProps,
  OutputCreateProductProps,
  inputCreateProductExitSchema,
  outputCreateProductExitSchema,
} from "@/schemas/create-product-exit-schema"
import { OutputProductExitObjectProps } from "@/schemas/product-exit-object"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { CloudHail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm } from "react-hook-form"

export function useFormCreateProductExit() {
  const { push } = useRouter()

  const form = useForm<InputCreateProductProps>({
    resolver: zodResolver(inputCreateProductExitSchema),
    defaultValues: {
      products: [{}],
    },
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: queryKey.createProdcuctExit(),
    mutationFn: (data: OutputCreateProductProps) =>
      createManyProductsExit(data),
    onSuccess: ({ notifications }) => {
      queryClient.setQueryData<Notification[]>(
        queryKey.findAllNotifications(),
        oldData => {
          if (!oldData) return notifications

          return [...oldData, ...notifications]
        }
      )

      toast({
        title: "Saída de produtos cadastradas",
        description: "A saída de produtos foi efetuada com sucesso.",
        onAutoClose: () => push("/home"),
      })
    },
    onError: (err) => {

      console.log(err)

      toast({
        title: err.message,
        variant: "error",
        description: "Não foi possivel cadastrar saída de produto",
      })
    }
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const { append, remove, fields } = useFieldArray({
    name: "products",
    control,
  })

  const isLoading = isPending || isSubmitting

  function validateFormData({ products }: InputCreateProductProps) {
    const transformedData = {
      products: products.map(({ quantity, description, ...rest }) => ({
        ...rest,
        quantity: Number(quantity),
        description: description !== "" ? description : null,
      })),
    }

    return outputCreateProductExitSchema.safeParse(transformedData)
  }

  async function validateQuantity({
    productId,
    quantity,
    index,
  }: OutputProductExitObjectProps & { index: number }) {

    const product = await findProductById(productId);

    if (quantity > product.quantity) {

      setError(`products.${index}.quantity`, {
        message: `Quantidade de saída excede o estoque disponível que é ${product.quantity}`,
      })

      return false
    }

    return true
  }

  async function onSubmit({ products }: InputCreateProductProps) {

    const { data, error } = validateFormData({ products })

    if (error) return validateErrors<OutputCreateProductProps>(error, setError)

    const validationPromises = data.products.map(async (productExit, index) => {
      return await validateQuantity({ ...productExit, index })
    })

    const validationResults = await Promise.all(validationPromises)
    const formIsValid = validationResults.every(result => result === true)

    if (!formIsValid) return

    mutate(data)
  }

  function appendProduct() {
    append({
      createdAt: new Date(),
      description: null,
      username: "",
      productId: "",
      quantity: "0",
      region: "",
    })
  }

  function removeAllProducts() {
    for (let i = fields.length - 1; i >= 0; i--) {
      if (i !== 0) remove(i)
    }
  }

  return {
    form,
    fields,
    isLoading,
    isSuccess,
    onSubmit,
    handleSubmit,
    appendProduct,
    removeAllProducts,
    remove,
  }
}
