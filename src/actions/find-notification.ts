"use server"

import { prisma } from "@/lib/prisma"

export async function findNotification() {
    return prisma.notification.findMany()
}
