import { z } from "zod"

const ALLOWED_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/svg+xml",
] as const

export const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif"] as const

export const imageFileSchema = z.object({
	file: z
		.instanceof(File, { error: "Adicione um arquivo" })
		.superRefine((file, ctx) => {
			if (!(file instanceof File)) {
				ctx.addIssue({
					code: "custom",
					message: "Deve ser um arquivo",
				})

				return
			}

			if (file.size === 0) {
				ctx.addIssue({
					code: "custom",
					message: "Arquivo não pode estar vazio",
				})

				return
			}

			if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
				ctx.addIssue({
					code: "custom",
					message: `Tipo de arquivo não permitido. Permitidos: ${ALLOWED_EXTENSIONS.join(", ")}`,
				})

				return
			}

			const MAX_FILE_SIZE = 10 * 1024 * 1024

			if (file.size > MAX_FILE_SIZE) {
				ctx.addIssue({
					code: "custom",
					message: `Arquivo muito grande. Máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
				})

				return
			}

			const extension = file.name
				.toLowerCase()
				.slice(file.name.lastIndexOf("."))

			if (!ALLOWED_EXTENSIONS.includes(extension as any)) {
				ctx.addIssue({
					code: "custom",
					message: `Extensão não permitida. Permitidas: ${ALLOWED_EXTENSIONS.join(", ")}`,
				})

				return
			}
		}),
})

export type UploadImageProps = z.infer<typeof imageFileSchema>
