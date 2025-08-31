"use server"

import { prisma } from "@/lib/prisma"
import {
    OutputCreateProductProps
} from "@/schemas/create-product-exit-schema"
import { Notification } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"
import { updateProduct } from "../products/update-product"

export async function createManyProductsExist(
    { products }: OutputCreateProductProps
) {

    const notifications: Notification[] = []

    for (const { date, ...rest } of products) {

        const { product } = await prisma.productExit.create({
            data: {
                ...rest,
                createdAt: date,
            },
            include: {
                product: true
            }
        })

        const notification = await createNotification({
            name: product.name,
            description: `A saida do produto ${product.name} foi registrada com sucesso.`,
            createdAt: product.createdAt,
            action: "CREATE"
        })

        await updateProduct(product.id, {
            quantity: product.quantity - rest.quantity
        }, {
            includeNotifications: false
        })

        notifications.push(notification)
    }

    return {
        notifications
    }
}