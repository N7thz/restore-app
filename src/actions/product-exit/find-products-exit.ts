"use server"

import { prisma } from "@/lib/prisma"
import { ResponseProducts } from "@/types"
import { Prisma, ProductExit } from "@prisma/client"

export async function findProductsExit(
    props: Prisma.ProductExitFindManyArgs = {}
): ResponseProducts<ProductExit> {

    const products = await prisma.productExit.findMany({
        ...props
    })

    const count = await prisma.product.count()

    return {
        products,
        count
    }
}