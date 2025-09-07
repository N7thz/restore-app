"use server"

import { writeFile, unlink, access, mkdir } from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"
import { generateFilename, validateFile } from "@/lib/multer"
import { setCookie } from "cookies-next/server"

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath)
        return true
    } catch {
        return false
    }
}

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get("file") as File | null

        if (!file) {
            return { success: false, error: "Nenhum arquivo enviado" }
        }

        const validationError = validateFile(file)

        if (validationError) {
            return { success: false, error: validationError }
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = generateFilename(file.name)
        const uploadDir = path.join(process.cwd(), "public/uploads")
        const filePath = path.join(uploadDir, filename)

        try {

            try {
                await access(uploadDir)
            } catch {
                await mkdir(uploadDir, { recursive: true })
            }

            if (await fileExists(filePath)) {
                await unlink(filePath)
            }

            await writeFile(filePath, buffer)

        } catch (error) {
            console.error("Erro ao processar arquivo:", error)
            return { success: false, error: "Erro ao salvar o arquivo" }
        }

        revalidatePath("/upload")

        return {
            success: true,
            message: "Upload realizado com sucesso!",
            data: {
                filename: filename,
                originalName: file.name,
                size: file.size,
                type: file.type,
                path: `/uploads/${filename}`,
                uploadedAt: new Date().toISOString()
            }
        }

    } catch (error: any) {
        console.error("Erro no upload:", error)
        return { success: false, error: "Erro interno do servidor" }
    }
}