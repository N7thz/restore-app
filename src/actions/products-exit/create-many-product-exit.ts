"use server"

import { prisma } from "@/lib/prisma"
import { OutputCreateProductProps } from "@/schemas/create-product-exit-schema"
import { Notification } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"
import { updateProduct } from "../products/update-product"

export async function createManyProductsExit({
  products,
}: OutputCreateProductProps) {

  const notifications: Notification[] = []

  for (const data of products) {

    const { product, createdAt } = await prisma.productExit.create({
      data,
      include: {
        product: true,
      },
    })

    const notification = await createNotification({
      action: "CREATE",
      name: product.name,
      description: `A saida do produto ${product.name} foi registrada com sucesso.`,
      createdAt: product.createdAt,
    })

    const { productUpdated: { quantity } } = await updateProduct(
      product.id,
      {
        quantity: {
          decrement: data.quantity
        }
      },
      {
        includeNotifications: false,
      }
    )

    if (quantity < data.quantity) {

      const notification = await createNotification({
        action: "MIN_QUANTITY",
        name: product.name,
        description: `O produto ${product.name} entrou na quantidade miníma.`,
        createdAt,
      })

      notifications.push(notification)
    }

    notifications.push(notification)
  }

  return {
    notifications,
  }
}
