"use server"

import { prisma } from "@/lib/prisma"

export async function findUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: {
			email,
		},
		omit: {
			password: true,
			createdAt: true,
		},
	})
}
