"use server"

import { decrypt } from "@/lib/auth"
import type { CookieValueTypes } from "cookies-next"

export async function authenticate(token: CookieValueTypes) {

    if (!token) return null

    const payload = await decrypt(token)

    if (payload === null) return null

    const { sub } = payload

    const data = sub as unknown as {
        id: string
        email: string
        username: string
        imageUrl: string | null
    }

    return data
}