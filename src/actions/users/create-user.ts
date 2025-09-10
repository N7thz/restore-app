"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { hash } from "bcryptjs"

export async function createUser(user: Prisma.UserCreateInput) {

    const { email, username } = user

    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userAlreadyExists) throw new Error("O usuário já existe")

    const password = await hash(user.password, 6)

    const userCreated = await prisma.user.create({
        data: {
            email,
            username,
            password,
        },
    })

    return { userCreated }
}