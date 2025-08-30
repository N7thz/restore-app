import z from "zod"

export const outputProductSchema = z.object({
    name: z
        .string()
        .min(1, "O nome é obrigatório"),
    price: z
        .number()
        .positive("O preço deve ser positivo"),
    quantity: z
        .number()
        .positive("A quantidade deve ser positiva"),
    minQuantity: z
        .number()
        .positive("A quantidade minima deve ser positiva"),
    imageUrl: z
        .url("Url inválida")
        .nullable()
}).refine(({ quantity, minQuantity }) => quantity >= minQuantity, {
    error: "A quantidade deve ser maior que a quantidade minima",
    path: ["minQuantity"]
})

export const inputProductSchema = z.object({
    name: z
        .string()
        .min(1, "O nome é obrigatório"),
    price: z
        .string(),
    quantity: z
        .string(),
    minQuantity: z
        .string(),
    imageUrl: z
        .string()
        .nullable()
})

export type InputProductProps = z.infer<typeof inputProductSchema>

export type OutputProductProps = z.infer<typeof outputProductSchema>