"use server"

import { prisma } from "@/lib/prisma"
import { OutputProductProps } from "@/schemas/product-schema"
import { createNotification } from "../notifications/create-notification"

export async function updateProduct(id: string, formData: OutputProductProps) {

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

    const notification = await createNotification({
        name: product.name,
        description: `O produto ${product.name} foi atualizado com sucesso.`,
        action: "UPDATE"
    })

    return { notification }
}   