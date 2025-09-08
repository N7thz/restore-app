"use server"

import { prisma } from "@/lib/prisma"

export async function readAllNotification() {
  return await prisma.notification.updateManyAndReturn({
    where: {
      action: {
        not: {
          equals: "MIN_QUANTITY",
        },
      },
    },
    data: {
      read: true,
    },
  })
}
