import { z } from "zod"

export const createUpdateSchema = z.object({
    title: z.string()
        .min(1, "O título é obrigatório")
        .max(100, "O título deve ter no máximo 100 caracteres"),
    description: z.string()
        .max(200, "A descrição deve ter no máximo 200 caracteres")
        .optional(),
    content: z.string()
        .min(1, "O conteúdo é obrigatório")
        .max(500, "O conteúdo deve ter no máximo 500 caracteres")
})

export type CreateUpdateProps = z.infer<typeof createUpdateSchema>