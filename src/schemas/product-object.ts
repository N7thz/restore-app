import z from "zod"

export const inputProductObject = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  minQuantity: z.string(),
  imageUrl: z.string().nonempty("A url da imagem é obrigatória"),
})

export const outputProductObject = z.object({
  name: z.string().min(1, "O nome é obrigatório").toLowerCase(),
  minQuantity: z.int().positive("A quantidade minima deve ser positiva"),
  imageUrl: z.url("Url inválida"),
})

export type InputProductProps = z.infer<typeof inputProductObject>

export type OutputProductProps = z.infer<typeof outputProductObject>
