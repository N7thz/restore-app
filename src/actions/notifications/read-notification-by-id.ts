"use server"

import { prisma } from "@/lib/prisma"

export async function readNotificationById(id: string) {
    return await prisma.notification.update({
        where: {
            id
        },
        data: {
            read: true
        }
    })
}