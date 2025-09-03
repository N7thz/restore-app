import { deleteProduct } from "@/actions/products/delete-prduct"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKeys } from "@/lib/query-keys"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteProduct(id: string) {
    return useMutation({
        mutationKey: queryKeys.deleteProduct(),
        mutationFn: () => deleteProduct(id),
        onSuccess: ({ notification }) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.findAllProducts()
            })

            queryClient.setQueryData<Notification[]>(
                queryKeys.findAllNotifications(),
                (oldData) => {

                    if (!oldData) return [notification]

                    return [...oldData, notification]
                }
            )
        },
        onError: (err) => {
            console.error(err)
            toast({
                title: "Não foi possivel excluir o produto",
                variant: "error"
            })
        }
    })
}