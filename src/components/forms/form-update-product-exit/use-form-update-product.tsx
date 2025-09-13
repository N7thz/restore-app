import { updateProductExit } from "@/actions/products-exit/update-product-exit"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
  InputProductExitObjectProps,
  OutputProductExitObjectProps,
  inputProductExitObject,
  outputProductExitObject,
} from "@/schemas/product-exit-object"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification, Product } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export function useFormUpdateProductExit(
  id: string,
  {
    createdAt,
    description,
    region,
    name,
    productId,
    quantity,
    product,
  }: OutputProductExitObjectProps & { product: Product }
) {
  const form = useForm({
    resolver: zodResolver(inputProductExitObject),
    defaultValues: {
      createdAt,
      description,
      region,
      name,
      productId,
      quantity: quantity.toString(),
    },
  })

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const { push } = useRouter()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["update-product-exit"],
    mutationFn: (formData: OutputProductExitObjectProps) =>
      updateProductExit(id, formData),
    onSuccess: ({ notifications }) => {

      queryClient.setQueryData<Notification[]>(
        queryKey.findAllNotifications(),
        oldData => {
          if (!oldData) return notifications

          return [...oldData, ...notifications]
        }
      )

      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
        onAutoClose: () => push("/products-exit"),
      })
    },
    onError: error => {
      console.log(error)

      toast({
        title: error.message,
        description: "Tente passar um intervalo diferente",
        variant: "error",
      })
    },
  })

  const isLoading = isPending || isSubmitting

  function validateQuantity(quantity: number) {

    if (quantity > product.quantity) {

      setError("quantity", {
        message: `Quantidade de saída excede o estoque disponível que é ${product.quantity}`,
      })

      return false
    }

    return true
  }

  async function onSubmit({ quantity, ...rest }: InputProductExitObjectProps) {
    const { data, error } = outputProductExitObject.safeParse({
      quantity: Number(quantity),
      ...rest,
    })

    if (error)
      return validateErrors<OutputProductExitObjectProps>(error, setError)

    const formIsValid = validateQuantity(data.quantity)

    if (!formIsValid) return

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
