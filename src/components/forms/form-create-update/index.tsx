"use client"

import { createUpdate } from "@/actions/updates/create-update"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
    createUpdateSchema, CreateUpdateProps
} from "@/schemas/create-update-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const FormCreateUpdate = () => {

    const { push } = useRouter()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["create-update"],
        mutationFn: (formData: CreateUpdateProps) => createUpdate(formData),
        onSuccess: () => toast({
            title: "Novidade cadastrada com sucesso.",
            onAutoClose: () => push("/whats-new")
        }),
        onError: (err) => {

            console.log(err)

            toast({
                title: "Novidade cadastrada com sucesso.",
                onAutoClose: () => push("/whats-new")
            })
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateUpdateProps>({
        resolver: zodResolver(createUpdateSchema)
    })

    function onSubmit(data: CreateUpdateProps) {
        mutate(data)
    }

    const isLoading = isPending || isSuccess

    return (
        <form
            className="contents"
            onSubmit={handleSubmit(onSubmit)}
        >
            <CardContent className="space-y-4">
                <Label className="flex-col items-start">
                    Título:
                    <Input
                        {...register("title")}
                        className={cn(
                            errors.title && [
                                "focus-visible:ring-destructive",
                                "not-focus-visible:border-destructive",
                            ]
                        )}
                    />
                    {
                        errors.title &&
                        <SpanErrorMessage
                            message={errors.title.message}
                        />
                    }
                </Label>
                <Label className="flex-col items-start">
                    Descrição:
                    <Input
                        {...register("description")}
                        className={cn(
                            errors.description && [
                                "focus-visible:ring-destructive",
                                "not-focus-visible:border-destructive",
                            ]
                        )}
                    />
                    {
                        errors.description &&
                        <SpanErrorMessage
                            message={errors.description.message}
                        />
                    }
                </Label>
                <Label className="flex-col items-start">
                    Conteúdo:
                    <Textarea
                        {...register("content")}
                        className={cn(
                            "min-h-40",
                            errors.description && [
                                "focus-visible:ring-destructive",
                                "not-focus-visible:border-destructive",
                            ]
                        )}
                    />
                    {
                        errors.content &&
                        <SpanErrorMessage
                            message={errors.content.message}
                        />
                    }
                </Label>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {
                        isLoading
                            ? <Loader2 className="animate-spin" />
                            : "Confirmar"
                    }
                </Button>
            </CardFooter>
        </form>
    )
}
