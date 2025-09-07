// app/lib/multer.ts
import multer from "multer"
import path from "path"
import fs from "fs"

// Configuração do storage
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(process.cwd(), "public/uploads")

        // Cria diretório se não existir
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname)
        cb(null, "image-" + uniqueSuffix + extension)
    }
})

export function generateFilename(originalname: string): string {
    const extension = path.extname(originalname)
    return "user-icon" + extension
}

// Função para validar arquivo
export function validateFile(file: File): string | null {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]

    if (!file.type.startsWith("image/")) {
        return "Apenas imagens são permitidas"
    }

    if (!allowedTypes.includes(file.type)) {
        return "Formatos permitidos: JPEG, PNG, GIF, WebP"
    }

    if (file.size > 10 * 1024 * 1024) {
        return "Arquivo muito grande (máximo 10MB)"
    }

    return null
}

// Tipagem para o arquivo processado
export interface ProcessedFile {
    originalname: string
    filename: string
    mimetype: string
    size: number
    path: string
}