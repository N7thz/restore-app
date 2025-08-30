import { z } from "zod"
import { inputProductSchema, outputProductSchema } from "./product-schema"

export const inputCreateProductSchema = z.object({
    products: z.array(inputProductSchema)
})

export const outputCreateProductSchema = z.object({
    products: z.array(outputProductSchema)
})

export function productInputToOutput({ products }: InputCreateProductProps) {
    const transformedData = {
        products: products.map(({
            name,
            price,
            quantity,
            minQuantity,
            imageUrl
        }) => ({
            name,
            price: Number(price),
            quantity: Number(quantity),
            minQuantity: Number(minQuantity),
            imageUrl: imageUrl !== "" ? imageUrl : null
        }))
    }

    return outputCreateProductSchema.safeParse(transformedData)
}

export type InputCreateProductProps = z.infer<typeof inputCreateProductSchema>

export type OutputCreateProductProps = z.infer<typeof outputCreateProductSchema>