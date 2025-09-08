import { uploadImage } from "@/actions/upload-files"
import { toast } from "@/components/toast"
import { UploadImageProps, imageFileSchema } from "@/schemas/upload-file-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next/client"
import { useForm } from "react-hook-form"

export function useFormUploadUserIcon() {

    const refresh = () => window.location.reload()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["upload-user-icon"],
        mutationFn: async (formData: FormData) => await uploadImage(formData),
        onSuccess: ({ data }) => {

            if (!data) return

            const { filename } = data

            setCookie("user-icon", filename)

            toast({
                title: "Imagem atualizada",
                description: (
                    <span className="text-muted-foreground">
                        A imagem foi atualizada com sucesso
                    </span>
                ),
                onAutoClose: () => refresh(),
            })
        },
        onError: error => {

            console.log(error)

            toast({
                title: error.message,
                description: (
                    <span className="text-muted-foreground">
                        Tente novamente mais tarde
                    </span>
                ),
                variant: "error",
            })
        },
    })

    const userIcon = getCookie("user-icon")
    const defaultUrl = userIcon ? `/uploads/${userIcon}` : undefined

    const form = useForm<UploadImageProps>({
        resolver: zodResolver(imageFileSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = form

    const isLoading = isPending || isSuccess

    async function onSubmit({ file }: UploadImageProps) {
        const formData = new FormData()

        formData.append("file", file)

        mutate(formData)
    }

    return {
        form,
        defaultUrl,
        errors,
        isLoading,
        isPending,
        handleSubmit,
        onSubmit,
    }
}