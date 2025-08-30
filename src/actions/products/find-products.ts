"use server"

import { prisma } from "@/lib/prisma"
import { ResponseProducts } from "@/types"
import { Prisma, Product } from "@prisma/client"

export async function findProducts({ 
    take = 12, ...rest 
}: Prisma.ProductFindManyArgs = {}): ResponseProducts<Product> {

    const products = await prisma.product.findMany({
        take,
        ...rest
    })

    const count = await prisma.product.count()

    return {
        products,
        count
    }
}