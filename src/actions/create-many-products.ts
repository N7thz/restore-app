"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client'

export async function createManyProducts(
    products: Prisma.ProductCreateInput[]
) {
    await prisma.product.createMany({
        data: products
    })
}