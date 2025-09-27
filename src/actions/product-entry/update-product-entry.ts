"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"
import { findProductEntryById } from "./find-product-entry-by-id"

export async function updateProductEntry(
    id: string,
    data: Prisma.ProductEntryUpdateInput
) {

    await findProductEntryById(id)

    const {
        productId,
        createdAt
    } = await prisma.productEntry.update({
        where: { id },
        data
    })

    const productEntries = await prisma.productEntry.findMany({
        where: {
            productId: productId
        },
        select: { quantity: true }
    })

    const productExits = await prisma.productExit.findMany({
        where: {
            productId: productId
        },
        select: { quantity: true }
    })

    const totalEntries = (
        productEntries.reduce((sum, entry) => sum + entry.quantity, 0)
    )

    const totalExits = (
        productExits.reduce((sum, exit) => sum + exit.quantity, 0)
    )

    const currentQuantity = totalEntries - totalExits


    const product = await prisma.product.update({
        where: { id: productId },
        data: {
            quantity: currentQuantity
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
        createdAt
    })

    return { notification, product }
}