import { deleteProductExit } from "@/actions/products-exit/delete-prduct-exit"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { Notification, ProductExit } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteProductExit(
  id: string,
  setOpen: (open: boolean) => void
) {
  return useMutation({
    mutationKey: queryKey.deleteProduct(),
    mutationFn: () => deleteProductExit(id),
    onSuccess: ({ notification, productExit }) => {
      setOpen(false)

      queryClient.setQueryData<Notification[]>(
        queryKey.findAllNotifications(),
        oldData => {
          if (!oldData) return [notification]

          return [...oldData, notification]
        }
      )

      queryClient.setQueryData<{
        count: number
        products: ProductExit[]
      }>(queryKey.findAllProductsExit(), oldData => {
        if (!oldData)
          return {
            count: 1,
            products: [productExit],
          }

        const { products } = oldData

        const productsFilterd = products.filter(
          ({ id }) => id !== productExit.id
        )

        return {
          count: 1,
          products: productsFilterd,
        }
      })

      toast({
        title: "A saida de produto foi excluida.",
        description: (
          <span className="text-muted-foreground">
            {notification.description}
          </span>
        ),
      })
    },
    onError: (err) => {

      console.error(err)

      toast({
        title: "Não foi possivel excluir o produto",
        description: err.message,
        variant: "error",
      })
    },
  })
}
