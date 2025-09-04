"use server"

import {
    OuputExportProdctsSchema
} from "@/schemas/export-table-products"
import { prisma } from "@/lib/prisma"
import { ItemsLimitProps } from "@/types"
import { Product } from "@prisma/client"

type Type = keyof Product

export type FindManyProductsWithFilterProps = {
    takeString: ItemsLimitProps
    products: OuputExportProdctsSchema
}

function arrayToObjet(array: Type[]) {

    const omit: { [key: string]: boolean } = {}

    for (let item of array) {
        omit[item] = true
    }

    return omit
}

function removeFalse(obj: {
    [k: string]: unknown
}) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, valor]) => valor === false)
    )
}

export async function findManyProductsWithFilter({
    takeString,
    products
}: FindManyProductsWithFilterProps) {

    const { dateStart, dateEnd } = products

    const array = Object.keys(removeFalse(products))

    const omit = arrayToObjet(array as Type[])

    const take = takeString !== "all" ? Number(takeString) : undefined

    const filteredProducts = await prisma.product.findMany({
        where: {
            createdAt: {
                gte: takeString !== "all" ? new Date(dateStart) : undefined,
                lte: takeString !== "all" ? new Date(dateEnd) : undefined,
            }
        },
        omit: {
            ...omit,
            imageUrl: true,
            updatedAt: true
        },
        take
    })

    if (filteredProducts.length === 0)
        throw new Error("Não foram encontrados dados dentro desse intervalo", {
            cause: "você passou um intervalo onde não existe um produto."
        })

    return filteredProducts
}
