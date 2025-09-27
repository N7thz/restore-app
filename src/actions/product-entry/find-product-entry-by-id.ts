"use server"

import { prisma } from "@/lib/prisma"

export async function findProductEntryById(id: string) {
    
    const productEntry = await prisma.productEntry.findUnique({
        where: { id }
    })

    if (!productEntry) throw new Error("Entrada de produto não encontrada.")

    return productEntry
}