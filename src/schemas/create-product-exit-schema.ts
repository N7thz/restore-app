import { z } from "zod"
import {
	inputProductExitObject,
	outputProductExitObject,
} from "./product-exit-object-schema"

export const inputCreateProductExitSchema = z.object({
	products: z.array(inputProductExitObject),
})

export const outputCreateProductExitSchema = z.object({
	products: z.array(outputProductExitObject),
})

export type InputCreateProductProps = z.infer<
	typeof inputCreateProductExitSchema
>

export type OutputCreateProductProps = z.infer<
	typeof outputCreateProductExitSchema
>
