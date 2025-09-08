"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FormProvider } from "react-hook-form"
import { CardFormCreateProduct } from "./card-form-create-product"
import { useFormCreateProduct } from "./use-form-create-product"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const FormCreateProduct = () => {
  const {
    form,
    fields,
    isLoading,
    isSuccess,
    handleSubmit,
    onSubmit,
    appendProduct,
    removeAllProducts,
    remove,
  } = useFormCreateProduct()

  return (
    <>
      <FormProvider {...form}>
        <form
          id="form-create-products"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <CardFooter className={cn(
            "justify-end gap-4",
            "max-sm:flex-col",
          )}>
            <Button
              type="button"
              variant={"outline"}
              className={cn("w-1/2", "max-sm:w-full")}
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
              {fields.map((_, index) => (
                <CardFormCreateProduct
                  key={index}
                  index={index}
                  remove={remove}
                  fields={fields}
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
