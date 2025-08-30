"use server"

import { prisma } from "@/lib/prisma"

export async function deleteProduct(id: string) {

    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product) throw new Error("Não foi possivel encontrar o produto")

    await prisma.product.delete({
        where: { id }
    })
}