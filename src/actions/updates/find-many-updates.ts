"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findManyUpdates(props: Prisma.UpdateFindManyArgs = {}) {
	return await prisma.update.findMany(props)
}
