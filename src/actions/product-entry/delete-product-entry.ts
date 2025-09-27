"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"
import { findProductEntryById } from "./find-product-entry-by-id"

export async function deleteProductEntry(id: string) {

    await findProductEntryById(id)

    const { productId, quantity } = await prisma.productEntry.delete({
        where: { id },
    })

    const product = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            quantity: {
                decrement: quantity
            }
        },
        include: {
            productEntry: true,
            productExit: true
        }
    })

    const notification = await createNotification({
        action: "UPDATE",
        name: "Entrada de produto",
        description: "Entrada de produto atualizada com sucesso",
        createdAt: new Date()
    })

    return { notification, product }
}