"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function createNotification(
	notification: Prisma.NotificationCreateInput
) {
	return await prisma.notification.create({
		data: notification,
	})
}
