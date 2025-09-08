"use client"

import { findProductsExitById } from "@/actions/products-exit/find-products-exit-by-id"
import { DatePickerUpdate } from "@/components/date-picker-update"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { queryKey } from "@/lib/query-keys"
import { OutputProductExitObjectProps } from "@/schemas/product-exit-object"
import { Product } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { ChevronDownIcon, Loader2, RotateCcw } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { DescriptionLabel } from "./description"
import { QuantityLabel } from "./quantity"
import { RegionLabel } from "./region"
import { SelectProductUpdate } from "./select-product-update"
import { useFormUpdateProductExit } from "./use-form-update-product"
import { UsernameLabel } from "./user-name"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const FormUpdateProductExit = ({ id }: { id: string }) => {
  const {
    data: product,
    isLoading,
    status,
    refetch,
  } = useQuery({
    queryKey: queryKey.findProductExitById(id),
    queryFn: () => findProductsExitById(id),
  })

  if (isLoading) {
    return (
      <>
        <div className="space-y-4">
          <Separator />
          <CardContent className="size-full space-y-4">
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-primary-foreground"
            >
              <span className="truncate text-muted-foreground">
                Selecione a data
              </span>
              <ChevronDownIcon />
            </Button>
            <Label className="flex-col items-start">
              A quem foi entrege:
              <Input readOnly />
            </Label>
            <Label className="flex-col items-start">
              Quantidade:
              <Input readOnly />
            </Label>
            <Label className="flex-col items-start">
              Região:
              <Input readOnly />
            </Label>
            <Label className="flex-col items-start">
              Selecione um produto:
              <Button
                type="button"
                variant="outline"
                role="combobox"
                className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
              >
                <span className="truncate text-muted-foreground">
                  Selecione um produto
                </span>
                <ChevronDownIcon className="text-muted-foreground/80 shrink-0 size-4" />
              </Button>
            </Label>
            <Label className="flex-col items-start">
              Descrição:
              <Textarea readOnly />
            </Label>
          </CardContent>
          <Separator />
        </div>
        <CardFooter className="justify-end">
          <Button className="w-1/2" disabled>
            Confirmar
          </Button>
        </CardFooter>
      </>
    )
  }

  if (status === "error" || !product) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Não foi possivel carregar o produto</CardTitle>
          <CardAction>
            <Button
              variant={"secondary"}
              className="w-full"
              onClick={() => refetch()}
            >
              <RotateCcw className="group-hover:-rotate-360 transition-all" />
              Tentar novamente
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    )
  }

  return <UpdateProductExit id={id} product={product} />
}

export const UpdateProductExit = ({
  id,
  product,
}: {
  id: string
  product: OutputProductExitObjectProps & { product: Product }
}) => {

  const {
    form,
    isLoading,
    isSuccess,
    isPending,
    handleSubmit,
    onSubmit
  } = useFormUpdateProductExit(id, product)

  return (
    <>
      <FormProvider {...form}>
        <form
          id="form-update-product-exit"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Separator />
          <CardContent className="size-full space-y-4">
            <DatePickerUpdate />
            <UsernameLabel />
            <SelectProductUpdate />
            <QuantityLabel />
            <RegionLabel />
            <DescriptionLabel />
          </CardContent>
          <Separator />
        </form>
      </FormProvider>
      <CardFooter className="justify-end">
        <Button
          type="submit"
          form="form-update-product-exit"
          className="w-1/2"
          disabled={isLoading || isSuccess}
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Confirmar"}
        </Button>
      </CardFooter>
    </>
  )
}
