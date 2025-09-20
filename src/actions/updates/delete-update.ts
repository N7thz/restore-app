"use server"

import { prisma } from "@/lib/prisma"
import { findUpdateById } from "./find-update-by-id"

export async function deleteUpdate(id: string) {

    await findUpdateById(id)

    return await prisma.update.delete({
        where: {
            id
        }
    })
}