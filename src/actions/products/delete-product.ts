"use server"

import { prisma } from "@/lib/prisma"
import { createNotification } from "../notifications/create-notification"
import { findProductById } from "./find-product-by-id"

export async function deleteProduct(id: string) {
  const product = await findProductById(id)

  const productDeleted = await prisma.product.delete({
    where: { id },
  })

  const notification = await createNotification({
    name: product.name,
    description: `O produto ${product.name} foi excluido com sucesso.`,
    action: "DELETE",
    createdAt: new Date(),
  })

  return { notification, productDeleted }
}
