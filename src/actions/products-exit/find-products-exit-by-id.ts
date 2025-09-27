"use server"

import { prisma } from "@/lib/prisma"

export async function findProductsExitById(id: string) {
	const product = await prisma.productExit.findUnique({
		include: {
			product: true,
		},
		where: {
			id,
		},
	})

	if (!product) throw new Error("Não foi possivel encontrar a saida produto")

	return product
}
