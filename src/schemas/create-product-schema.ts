import { z } from "zod"
import { inputProductObject, outputProductObject } from "./product-object"

export const inputCreateProductSchema = z.object({
  products: z.array(inputProductObject),
})

export const outputCreateProductSchema = z.object({
  products: z.array(outputProductObject),
})

export type InputCreateProductProps = z.infer<typeof inputCreateProductSchema>

export type OutputCreateProductProps = z.infer<typeof outputCreateProductSchema>
