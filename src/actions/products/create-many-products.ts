"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client'
import { createNotification } from "../notifications/create-notification"

export async function createManyProducts(
    data: Prisma.ProductCreateInput[]
) {
    const products = await prisma.product.createManyAndReturn({
        data
    })

    products.map(async ({ name, createdAt }) => (
        await createNotification({
            name: `O produto ${name} foi criado com sucesso.`,
            createdAt
        })
    ))
}