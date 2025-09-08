import { updateProduct } from "@/actions/products/update-product"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
  InputProductProps,
  inputProductObject,
  OutputProductProps,
  outputProductObject,
} from "@/schemas/product-object"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export function useFormUpdateProduct(
  id: string,
  { name, price, imageUrl, quantity, minQuantity }: OutputProductProps
) {
  const { push } = useRouter()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: queryKey.updateProduct(id),
    mutationFn: (formData: OutputProductProps) => updateProduct(id, formData),
    onSuccess: ({ notification }) => {

      if (notification) {
        queryClient.setQueryData<Notification[]>(
          queryKey.findAllNotifications(),
          oldData => {
            if (!oldData) return [notification]

            return [...oldData, notification]
          }
        )
      }

      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
        onAutoClose: () => push("/products"),
      })
    },
  })

  const form = useForm<InputProductProps>({
    resolver: zodResolver(inputProductObject),
    defaultValues: {
      name,
      imageUrl,
      quantity: quantity.toString(),
      minQuantity: minQuantity.toString(),
      price: price.toString(),
    },
  })

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const isLoading = isPending || isSubmitting

  function onSubmit({
    name,
    price,
    imageUrl,
    quantity,
    minQuantity,
  }: InputProductProps) {
    const { data, error } = outputProductObject.safeParse({
      name,
      price: Number(price),
      quantity: Number(quantity),
      minQuantity: Number(minQuantity),
      imageUrl: imageUrl !== "" ? imageUrl : null,
    })

    if (error) return validateErrors<OutputProductProps>(error, setError)

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
