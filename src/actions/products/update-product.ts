"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"

export async function updateProduct(
    id: string,
    formData: Prisma.ProductUpdateInput,
    options: {
        includeNotifications?: boolean
    } = {}
) {

    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) throw new Error("Não foi possivel encontrar o produto")

    await prisma.product.update({
        where: {
            id
        },
        data: {
            ...formData
        }
    })

    if (options.includeNotifications) {

        const notification = await createNotification({
            name: product.name,
            description: `O produto ${product.name} foi atualizado com sucesso.`,
            action: "UPDATE",
            createdAt: new Date()
        })

        return { notification }
    }

    return {}
}   