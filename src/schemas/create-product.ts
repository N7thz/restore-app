import { z } from "zod"

export const inputCreateProductSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    price: z.string(),
    quantity: z.string(),
    imageUrl: z.string().nullable()
})

export const outputCreateProductSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    price: z.number().positive("O preço deve ser positivo"),
    quantity: z.int().positive("A quantidade deve ser positiva"),
    imageUrl: z.url("A url está incorreta").nullable()
})

export type InputCreateProductProps = z.infer<typeof inputCreateProductSchema>

export type OutputCreateProductProps = z.infer<typeof outputCreateProductSchema>