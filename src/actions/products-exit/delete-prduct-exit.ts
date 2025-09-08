"use server"

import { prisma } from "@/lib/prisma"
import { createNotification } from "../notifications/create-notification"
import { updateProduct } from "../products/update-product"
import { findProductsExitById } from "./find-products-exit-by-id"

export async function deleteProductExit(id: string) {
  const { product, quantity } = await findProductsExitById(id)

  const productExit = await prisma.productExit.delete({
    where: { id },
  })

  await updateProduct(product.id, {
    quantity: {
      increment: quantity,
    },
  })

  const notification = await createNotification({
    name: product.name,
    description: `O produto ${product.name} foi excluido com sucesso.`,
    action: "DELETE",
    createdAt: new Date(),
  })

  return { notification, productExit }
}
