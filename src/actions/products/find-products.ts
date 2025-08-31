"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findProducts(props: Prisma.ProductFindManyArgs = {}) {

    const products = await prisma.product.findMany({
        ...props
    })

    const count = await prisma.product.count()

    return {
        products,
        count
    }
}