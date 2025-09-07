"use client"

import { uploadImage } from "@/actions/upload-files"
import { InputFile } from "@/components/input-file"
import { SpanErrorMessage } from "@/components/span-error"
import { UploadImageProps, imageFileSchema } from "@/schemas/upload-file-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import {
    getCookie, setCookie
} from 'cookies-next/client'
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/toast"

export const FormUploadUserIcon = () => {

    const refresh = () => window.location.reload()

    const { mutate } = useMutation({
        mutationKey: ["upload-user-icon"],
        mutationFn: async (formData: FormData) => await uploadImage(formData),
        onSuccess: ({ data }) => {

            if (!data) return

            const { filename } = data

            console.log(data)

            setCookie("user-icon", filename)

            toast({
                title: "Imagem atualizada",
                description: (
                    <span className="text-muted-foreground">
                        A imagem foi atualizada com sucesso
                    </span>
                ),
                onAutoClose: () => refresh()
            })
        },
        onError: (error) => {

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
        }
    })

    const userIcon = getCookie("user-icon")

    console.log("token", userIcon)

    const defaultUrl = userIcon ? `/uploads/${userIcon}` : undefined

    console.log(defaultUrl)

    const form = useForm<UploadImageProps>({
        resolver: zodResolver(imageFileSchema)
    })

    const {
        setError,
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = form

    async function onSubmit({ file }: UploadImageProps) {

        const formData = new FormData

        formData.append("file", file)

        mutate(formData)
    }

    return (
        <FormProvider {...form}>
            <form
                id="form-upload-file"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <InputFile defaultUrl={defaultUrl} />
                {
                    errors.file &&
                    <SpanErrorMessage message={errors.file.message} />
                }
            </form>
        </FormProvider>

    )
}
