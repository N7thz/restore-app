"use server"

import { prisma } from "@/lib/prisma"
import { Notification, Prisma } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"

export async function createManyProducts(
    data: Prisma.ProductCreateInput[]
) {
    const products = await prisma.product.createManyAndReturn({
        data
    })

    const notifications: Notification[] = []

    for (const product of products) {

        const { name, createdAt } = product

        const notification = await createNotification({
            name: name.toLowerCase(),
            description: `O produto ${name} foi criado com sucesso.`,
            action: "CREATE",
            createdAt
        })

        notifications.push(notification)
    }

    return { notifications }
}