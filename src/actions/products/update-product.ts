"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"
import { findProductById } from "./find-product-by-id"

export async function updateProduct(
    id: string,
    formData: Prisma.ProductUpdateInput,
    options: {
        includeNotifications?: boolean
    } = {}
) {

    const product = await findProductById(id)

    const productUpdated = await prisma.product.update({
        where: {
            id
        },
        data: formData
    })

    if (options.includeNotifications) {

        const description = `O produto ${product.name} foi atualizado com sucesso.`

        const notification = await createNotification({
            name: product.name,
            description,
            action: "UPDATE",
            createdAt: productUpdated.updatedAt
        })

        return { notification, productUpdated }
    }

    return { productUpdated }
}   