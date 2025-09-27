import { deleteProduct } from "@/actions/products/delete-product"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { Notification, Product } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"

export function useDeleteProduct(id: string) {
  
}
