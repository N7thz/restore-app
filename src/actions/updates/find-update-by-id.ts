"use server"

import { prisma } from "@/lib/prisma"

export async function findUpdateById(id: string) {
	const update = await prisma.update.findUnique({
		where: {
			id,
		},
	})

	if (!update) throw new Error("O update não foi encontrado")

	return update
}
