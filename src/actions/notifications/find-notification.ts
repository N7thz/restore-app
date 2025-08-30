"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findNotification(
    props: Prisma.NotificationFindManyArgs = {}
) {
    return prisma.notification.findMany(props)
}