import { z } from "zod"

export const inputCreateProductEntrySchema = z.object({
    price: z
        .string()
        .nonempty("O preço deve ser positivo"),
    quantity: z
        .string()
        .nonempty("A quantidade deve ser pelo menos 1"),
    productId: z
        .uuid("O produto é obrigatório")
        .min(1, "O ID do produto é obrigatório")
})

export type InputCreateProductEntryProps =
    z.infer<typeof inputCreateProductEntrySchema>

export const outputCreateProductEntrySchema = z.object({
    price: z
        .number()
        .positive("O preço deve ser positivo"),
    quantity: z
        .number()
        .int("A quantidade deve ser um número inteiro")
        .min(1, "A quantidade deve ser pelo menos 1"),
    productId: z
        .uuid()
        .min(1, "O ID do produto é obrigatório")
})

export type OutputCreateProductEntryProps =
    z.infer<typeof outputCreateProductEntrySchema>

