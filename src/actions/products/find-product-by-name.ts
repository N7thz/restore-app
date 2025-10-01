"use server"

import { prisma } from "@/lib/prisma"

export async function findProductByName(name: string) {

	const product = await prisma.product.findUnique({
		where: { name },
		include: {
			productEntry: true,
			productExit: true,
		},
	})

	if (!product) throw new Error("Não foi possivel encontrar o produto")

	return product
}
