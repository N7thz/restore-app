import { itemsLimit } from "@/types"
import z from "zod"

export const inputExportProdctsSchema = z.object({
    dateStart: z
        .string()
        .refine(date => date !== "", { error: "selecione uma data inicial" }),
    dateEnd: z
        .string()
        .refine(date => date !== "", { error: "selecione uma data final" }),
    id: z.boolean(),
    name: z.boolean(),
    description: z.boolean(),
    price: z.boolean(),
    quantity: z.boolean(),
    minQuantity: z.boolean(),
    createdAt: z.boolean(),
    itemsLimit: z.enum(itemsLimit, {
        error: "selecione um valor válido"
    })
}).refine(({ dateStart, dateEnd }) => dateStart <= dateEnd, {
    error: "a data inicial deve ser maior que a final.",
    path: ["dateStart"]
})

export const ouputExportProdctsSchema = z.object({
    id: z.boolean(),
    dateStart: z.date(),
    dateEnd: z.date(),
    name: z.boolean(),
    description: z.boolean(),
    price: z.boolean(),
    quantity: z.boolean(),
    minQuantity: z.boolean(),
    createdAt: z.boolean(),
    itemsLimit: z.enum(itemsLimit, {
        error: "selecione um valor válido"
    })
}).refine(({ id, name, description, price, quantity, minQuantity, createdAt }) => {
    return id || name || description || price || quantity || minQuantity || createdAt
}, {
    error: "selecione pelo menos um campo para exportar",
    path: ["id"]
})

export type InputExportProdctsSchema = z.infer<typeof inputExportProdctsSchema>

export type OuputExportProdctsSchema = z.infer<typeof ouputExportProdctsSchema>