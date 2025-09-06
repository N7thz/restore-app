"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findProductsExit<T>(
    props: Prisma.ProductExitFindManyArgs = {}
) {

    const products = await prisma.productExit.findMany({
        ...props
    }) as T[]

    return products
}