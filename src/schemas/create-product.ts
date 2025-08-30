import { z } from "zod"

export const inputCreateProductSchema = z.object({
    products: z.array(
        z.object({
            name: z
                .string()
                .min(1, "O nome é obrigatório"),
            price: z
                .string(),
            quantity: z
                .string(),
            imageUrl: z
                .string()
                .nullable()
        })
    )
})

export const outputCreateProductSchema = z.object({
    products: z.array(z.object({
        name: z
            .string()
            .min(1, "O nome é obrigatório"),
        price: z
            .number()
            .positive("O preço deve ser positivo"),
        quantity: z
            .int()
            .positive("A quantidade deve ser positiva"),
        imageUrl: z
            .url("Url inválida")
            .nullable()
    }))
})

export function productInputToOutput({ products }: InputCreateProductProps) {

    const transformedData = {
        products: products.map(({
            name,
            price,
            quantity,
            imageUrl
        }) => ({
            name,
            price: Number(price),
            quantity: parseInt(quantity),
            imageUrl: imageUrl !== "" ? imageUrl : null
        }))
    }

    return outputCreateProductSchema.safeParse(transformedData)
}

export type InputCreateProductProps = z.infer<typeof inputCreateProductSchema>

export type OutputCreateProductProps = z.infer<typeof outputCreateProductSchema>