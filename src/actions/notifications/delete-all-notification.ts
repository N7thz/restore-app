"use server"

import { prisma } from "@/lib/prisma"

export async function deleteAllNotification() {
    return await prisma.notification.deleteMany({
        where: {
            action: {
                not: {
                    equals: "MIN_QUANTITY"
                }
            }
        }
    })
}