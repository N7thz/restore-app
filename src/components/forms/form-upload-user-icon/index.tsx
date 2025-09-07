"use client"

import { uploadImage } from "@/actions/upload-files"
import { InputFile } from "@/components/input-file"
import { SpanErrorMessage } from "@/components/span-error"
import { ALLOWED_EXTENSIONS, UploadImageProps, imageFileSchema } from "@/schemas/upload-file-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import {
    getCookie, setCookie
} from "cookies-next/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"

type FormUploadUserIconProps = ComponentProps<typeof Card> & {
    isTitle?: boolean
}

export const FormUploadUserIcon = ({ isTitle, ...props }: FormUploadUserIconProps) => {

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
    const defaultUrl = userIcon ? `/uploads/${userIcon}` : undefined

    const form = useForm<UploadImageProps>({
        resolver: zodResolver(imageFileSchema)
    })

    const {
        handleSubmit,
        formState: { errors }
    } = form

    const isLoading = isPending || isSuccess

    async function onSubmit({ file }: UploadImageProps) {

        const formData = new FormData

        formData.append("file", file)

        mutate(formData)
    }

    return (
        <Card {...props}>
            {
                isTitle &&
                <CardHeader>
                    <CardTitle className="text-lg">
                        Altere o icon de usuário
                    </CardTitle>
                    <CardDescription>
                        São permitidos os tipos
                        {
                            ALLOWED_EXTENSIONS.map(item => (
                                <span key={item} className="ml-2 italic">
                                    {item},
                                </span>
                            ))
                        }
                    </CardDescription>
                </CardHeader>
            }
            <CardContent className="flex size-full gap-2">
                <FormProvider {...form}>
                    <form
                        id="form-upload-file"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mx-auto"
                    >
                        <InputFile defaultUrl={defaultUrl} />
                        {
                            errors.file &&
                            <SpanErrorMessage message={errors.file.message} />
                        }
                    </form>
                </FormProvider>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    form="form-upload-file"
                    disabled={isLoading || !form.watch("file")}
                    className="w-full"
                >
                    {
                        isPending
                            ? <Loader2 className="animate-spin" />
                            : "Confirmar"
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}
