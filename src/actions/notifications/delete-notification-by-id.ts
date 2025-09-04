"use server"

import { prisma } from "@/lib/prisma"

export async function deleteNotificationById(id: string) {
    return await prisma.notification.delete({
        where: {
            id
        }
    })
}