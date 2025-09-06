"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findProducts({ orderBy = {
    createdAt: "desc"
}, ...props }: Prisma.ProductFindManyArgs = {}) {

    const products = await prisma.product.findMany({
        orderBy,
        ...props
    })

    return products
}