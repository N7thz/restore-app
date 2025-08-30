"use server"

import { prisma } from "@/lib/prisma"
import { createNotification } from "../notifications/create-notification"

export async function deleteProduct(id: string) {

    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product) throw new Error("Não foi possivel encontrar o produto")

    await prisma.product.delete({
        where: { id }
    })

    const notification = await createNotification({
        name: `O produto ${product.name} foi excluido com sucesso.`,
        action: "DELETE",
    })

    return { notification }
}