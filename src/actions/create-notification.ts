"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function createNotification(data: Prisma.NotificationCreateInput) {
    return await prisma.notification.create({
        data
    })
}
