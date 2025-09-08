import { z } from "zod"

export const signSchema = z.object({
	email: z.email("E-mail inválido"),
	password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
})

export type FormSignData = z.infer<typeof signSchema>