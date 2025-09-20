"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { findUpdateById } from "./find-update-by-id"

export async function updateUpdate(
    id: string, update: Prisma.UpdateUpdateInput
) {

    await findUpdateById(id)

    return await prisma.update.update({
        where: {
            id
        },
        data: update
    })
}