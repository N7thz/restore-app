"use server"

import { prisma } from "@/lib/prisma"
import { ResponseProducts } from "@/types"
import { Prisma, Product } from "@prisma/client"

export async function findProducts(props: Prisma.ProductFindManyArgs = {}): ResponseProducts<Product> {

    const products = await prisma.product.findMany({
        ...props
    })

    const count = await prisma.product.count()

    return {
        products,
        count
    }
}