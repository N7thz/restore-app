import { deleteProduct } from "@/actions/products/delete-product"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { Notification, Product } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"

export function useDeleteProduct(id: string) {
  const pathname = usePathname()
  const { push } = useRouter()

  return useMutation({
    mutationKey: queryKey.deleteProduct(),
    mutationFn: () => deleteProduct(id),
    onSuccess: ({ notification, productDeleted }) => {
      queryClient.setQueryData<Notification[]>(
        queryKey.findAllNotifications(),
        oldData => {
          if (!oldData) return [notification]

          return [...oldData, notification]
        }
      )

      queryClient.setQueryData<Product[]>(
        queryKey.findAllProducts(),
        oldData => {
          if (!oldData) return [productDeleted]

          const productsFilterd = oldData.filter(
            ({ id }) => id !== productDeleted.id
          )

          return productsFilterd
        }
      )

      toast({
        title: "A produto foi excluido com sucesso",
        description: (
          <span className="text-muted-foreground">
            {notification.description}
          </span>
        ),
        onAutoClose: () => {
          if (pathname.startsWith("/products")) {
            push("/products")
          }
        },
      })
    },
    onError: (err) => {

      console.error(err)

      toast({
        title: "Não foi possivel excluir o produto",
        description: <span>{err.message}</span>,
        variant: "error",
      })
    },
  })
}
