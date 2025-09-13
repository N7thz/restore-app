import { itemsLimit } from "@/types"
import z from "zod"

export const inputExportProdctsExitSchema = z
  .object({
    dateStart: z.string(),
    dateEnd: z.string(),
    id: z.boolean(),
    description: z.boolean(),
    quantity: z.boolean(),
    createdAt: z.boolean(),
    name: z.boolean(),
    region: z.boolean(),
    itemsLimit: z.enum(itemsLimit, {
      error: "selecione um valor válido",
    }),
  })
  .refine(({ dateStart, dateEnd }) => dateStart <= dateEnd, {
    error: "a data inicial deve ser maior que a final.",
    path: ["dateStart"],
  })
  .refine(
    ({ id, region, description, name, quantity, createdAt }) => {
      return id || region || description || name || quantity || createdAt
    },
    {
      error: "selecione pelo menos um campo para exportar",
      path: ["id"],
    }
  )
  .refine(
    ({ dateStart, dateEnd, itemsLimit }) =>
      !(itemsLimit !== "all" && dateStart === "" && dateEnd === ""),
    {
      error: "Selecione um intervalo de datas",
      path: ["dateStart"],
    }
  )

export const ouputExportProdctsExitSchema = z.object({
  dateStart: z.date(),
  dateEnd: z.date(),
  id: z.boolean(),
  description: z.boolean(),
  quantity: z.boolean(),
  createdAt: z.boolean(),
  name: z.boolean(),
  region: z.boolean(),
  itemsLimit: z.enum(itemsLimit, {
    error: "selecione um valor válido",
  }),
})

export type InputExportProdctsExitSchema = z.infer<
  typeof inputExportProdctsExitSchema
>

export type OuputExportProdctsExitSchema = z.infer<
  typeof ouputExportProdctsExitSchema
>
