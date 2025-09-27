"use server"

import { prisma } from "@/lib/prisma"

export async function findProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      productEntry: true,
      productExit: true,
    }
  })

  if (!product) throw new Error("Não foi possivel encontrar o produto")

  return product
}
