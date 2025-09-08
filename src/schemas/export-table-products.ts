import { itemsLimit } from "@/types"
import z from "zod"

export const inputExportProdctsSchema = z
  .object({
    dateStart: z.string(),
    dateEnd: z.string(),
    id: z.boolean(),
    name: z.boolean(),
    description: z.boolean(),
    price: z.boolean(),
    quantity: z.boolean(),
    minQuantity: z.boolean(),
    createdAt: z.boolean(),
    itemsLimit: z.enum(itemsLimit, {
      error: "selecione um valor válido",
    }),
  })
  .refine(({ dateStart, dateEnd }) => dateStart <= dateEnd, {
    error: "a data inicial deve ser maior que a final.",
    path: ["dateStart"],
  })
  .refine(
    ({ id, name, description, price, quantity, minQuantity, createdAt }) => {
      return (
        id ||
        name ||
        description ||
        price ||
        quantity ||
        minQuantity ||
        createdAt
      )
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
    error: "selecione um valor válido",
  }),
})

export type InputExportProdctsSchema = z.infer<typeof inputExportProdctsSchema>

export type OuputExportProdctsSchema = z.infer<typeof ouputExportProdctsSchema>
