"use server"

import { prisma } from "@/lib/prisma"

export async function findProducts() {
    return await prisma.product.findMany()
}