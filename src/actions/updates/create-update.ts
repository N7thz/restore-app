"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function createUpdate(update: Prisma.UpdateCreateInput) {
	return await prisma.update.create({
		data: update,
	})
}
