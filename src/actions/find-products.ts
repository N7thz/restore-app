"use server"

import { prisma } from "@/lib/prisma"
import { ResponseProducts } from "@/types"
import { Product } from "@prisma/client"

export async function findProducts(): ResponseProducts<Product> {

    const products = await prisma.product.findMany({
        take: 12
    })

    const count = await prisma.product.count()

    return {
        products,
        count
    }
}