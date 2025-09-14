import { uploadImage } from "@/actions/upload-files"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { authClient } from "@/lib/auth-client"
import { queryKey } from "@/lib/query-keys"
import { supabase } from "@/lib/supabase"
import { UploadImageProps, imageFileSchema } from "@/schemas/upload-file-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export function useFormUploadUserIcon() {

    const refresh = () => window.location.reload()

    const { data } = authClient.useSession()

    const image = data?.user.image

    const { mutate, isPending } = useMutation({
        mutationKey: ["upload-user-icon"],
        mutationFn: async (file: File) => await uploadImage(file),
        onSuccess: ({ notification }) => {

            queryClient.setQueryData<Notification[]>(
                queryKey.findAllNotifications(),
                oldData => {

                    if (!oldData) return [notification]

                    return [...oldData, notification]
                }
            )

            toast({
                title: "Imagem atualizada",
                description: "A imagem foi atualizada com sucesso",
                onAutoClose: () => refresh(),
            })
        },
        onError: error => {

            console.log(error)

            toast({
                title: error.message,
                description: "Tente novamente mais tarde",
                variant: "error",
            })
        },
    })

    const form = useForm<UploadImageProps>({
        resolver: zodResolver(imageFileSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = form

    const isLoading = isPending

    async function onSubmit({ file }: UploadImageProps) {
        mutate(file)
    }

    return {
        form,
        image,
        errors,
        isLoading,
        isPending,
        handleSubmit,
        onSubmit,
    }
}