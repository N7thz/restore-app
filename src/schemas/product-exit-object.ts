import z from "zod"

export const inputProductExitObject = z.object({
    date: z.date("A data é obrigatória"),
    region: z
        .string()
        .min(1, "O nome é obrigatório"),
    quantity: z
        .string()
        .min(1, "A quantidade é obrigatória"),
    description: z
        .string()
        .nullable(),
    username: z
        .string()
        .min(1, "A quem foi entrege é obrigatório"),
    productId: z
        .string()
        .min(1, "O nome do produto é obrigatório"),
})

export const outputProductExitObject = z.object({
    date: z.date("A data é obrigatória"),
    region: z
        .string()
        .min(1, "O nome é obrigatório")
        .toLowerCase(),
    quantity: z
        .number()
        .positive("A quantidade deve ser positiva."),
    description: z
        .string()
        .toLowerCase()
        .nullable(),
    username: z
        .string()
        .toLowerCase(),
    productId: z
        .uuid()
        .min(1, "O nome do produto é obrigatório"),
})

export type InputProductExitObjectProps = z.infer<typeof inputProductExitObject>

export type OutputProductExitObjectProps =
    z.infer<typeof outputProductExitObject>