"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"

export async function createProductEntry(data: Prisma.ProductEntryCreateInput) {

    const {
        createdAt, quantity, productId
    } = await prisma.productEntry.create({
        data
    })

    await prisma.product.update({
        where: { id: productId },
        data: {
            quantity: {
                increment: quantity
            }
        }
    })

    const notification = await createNotification({
        action: "CREATE",
        name: "Entrada de produto",
        description: "Entrada de produto criada com sucesso",
        createdAt
    })

    return { notification, productId }
}