"use client"

import { InputFile } from "@/components/input-file"
import { SpanErrorMessage } from "@/components/span-error"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ALLOWED_EXTENSIONS
} from "@/schemas/upload-file-schema"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"
import { FormProvider } from "react-hook-form"
import { useFormUploadUserIcon } from "./use-form-upload-user-icon"

type FormUploadUserIconProps = ComponentProps<typeof Card> & {
  isTitle?: boolean
}

export const FormUploadUserIcon = ({
  isTitle,
  ...props
}: FormUploadUserIconProps) => {

  const {
    form,
    image,
    errors,
    isLoading,
    isPending,
    handleSubmit,
    onSubmit,
  } = useFormUploadUserIcon()

  return (
    <Card {...props}>
      {isTitle && (
        <CardHeader>
          <CardTitle className="text-lg">Altere o icon de usuário</CardTitle>
          <CardDescription>
            São permitidos os tipos
            {ALLOWED_EXTENSIONS.map(item => (
              <span key={item} className="ml-2 italic">
                {item},
              </span>
            ))}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className="flex size-full gap-2">
        <FormProvider {...form}>
          <form
            id="form-upload-file"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mx-auto"
          >
            <InputFile defaultUrl={image ?? undefined} />
            {errors.file && <SpanErrorMessage message={errors.file.message} />}
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
              : "Atualizar imagem"
          }
        </Button>
      </CardFooter>
    </Card>
  )
}
