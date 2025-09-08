"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { CardFormCreateProductExit } from "./card-form-create-product-exit"
import { useFormCreateProductExit } from "./use-form-create-product-exit"

export const FormCreateProductExit = () => {
  const {
    form,
    isLoading,
    fields,
    isSuccess,
    handleSubmit,
    onSubmit,
    appendProduct,
    removeAllProducts,
    remove,
  } = useFormCreateProductExit()

  return (
    <>
      <FormProvider {...form}>
        <form
          id="form-create-products"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <CardFooter className={cn("justify-end gap-4", "max-sm:flex-col")}>
            <Button
              type="button"
              variant={"outline"}
              className={cn("w-1/2", "max-sm:w-full")}
              disabled={isLoading || isSuccess}
              onClick={appendProduct}
            >
              Adicionar Produto
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              className={cn("w-1/2", "max-sm:w-full")}
              disabled={fields.length === 1}
              onClick={removeAllProducts}
            >
              Remover todos
            </Button>
          </CardFooter>
          <Separator />
          <ScrollArea className="h-[400px] overflow-hidden">
            <ScrollBar />
            <CardContent className="size-full space-y-4">
              {fields.map(({ id }, index) => (
                <CardFormCreateProductExit
                  key={id}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  fields={fields}
                  index={index}
                  remove={remove}
                />
              ))}
            </CardContent>
          </ScrollArea>
          <Separator />
        </form>
      </FormProvider>
      <CardFooter className="justify-end">
        <Button
          type="submit"
          form="form-create-products"
          className={cn("w-1/2", "max-sm:w-full")}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
        </Button>
      </CardFooter>
    </>
  )
}
