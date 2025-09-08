import { findManyProductsExitWithFilter } from "@/actions/products-exit/find-many-products-exit-with-filter"
import { toast } from "@/components/toast"
import { allColumnsProductExit } from "@/data/all-columns-products"
import { exportFormattedExcel } from "@/lib/advanced-excel-export"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
  InputExportProdctsExitSchema,
  OuputExportProdctsExitSchema,
  inputExportProdctsExitSchema,
  ouputExportProdctsExitSchema,
} from "@/schemas/export-table-products-exit"
import { ItemsLimitProps } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet } from "lucide-react"
import { useForm } from "react-hook-form"

export type FindManyProductsWithFilterProps = {
  takeString: ItemsLimitProps
  products: OuputExportProdctsExitSchema
}

export function useFormExportExitProdcts(setOpen: (open: boolean) => void) {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: queryKey.exportTableProductsExit(),
    mutationFn: ({ products, takeString }: FindManyProductsWithFilterProps) =>
      findManyProductsExitWithFilter({
        products,
        takeString,
      }),
    onSuccess: async data => {
      const tableData = data.map(item => {
        const {
          createdAt,
          product: { name, price },
        } = item

        return {
          ...item,
          createdAt: formatDate(createdAt, "P", { locale: ptBR }),
          name,
          price,
        }
      })

      const dataKeys = Object.keys(tableData[0])

      const columns = allColumnsProductExit.filter(column =>
        dataKeys.includes(column.key)
      )

      await exportFormattedExcel(tableData, columns, {
        fileName: "produtos_saida",
        sheetName: "produtos",
      })

      toast({
        title: "Os dados foram exportados com sucesso.",
        description: (
          <span className="text-muted-foreground">
            {`${data.length} itens foram exportados.`}
          </span>
        ),
        duration: 3000,
        icon: <Sheet className="size-4 text-primary" />,
        onAutoClose: () => setOpen(false),
      })
    },
    onError: error => {
      console.log(error)

      toast({
        title: error.message,
        description: (
          <span className="text-muted-foreground">
            Tente passar um intervalo diferente
          </span>
        ),
        variant: "error",
      })
    },
  })

  const form = useForm<InputExportProdctsExitSchema>({
    resolver: zodResolver(inputExportProdctsExitSchema),
    reValidateMode: "onChange",
    defaultValues: {
      id: true,
      region: true,
      username: true,
      description: true,
      quantity: true,
      createdAt: true,
    },
  })

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = form

  function onSubmit({
    dateStart,
    dateEnd,
    ...rest
  }: InputExportProdctsExitSchema) {
    const { error, data } = ouputExportProdctsExitSchema.safeParse({
      dateStart: dateStart !== "" ? new Date(dateStart) : new Date(),
      dateEnd: dateEnd !== "" ? new Date(dateEnd) : new Date(),
      ...rest,
    })

    if (error) {
      return validateErrors<OuputExportProdctsExitSchema>(error, setError)
    }

    mutate({
      products: data,
      takeString: data.itemsLimit,
    })
  }

  const ItemsLimit = ["10", "25", "30", "40", "50", "100", "todos"]

  const isLoading = isPending || isSuccess

  return {
    form,
    errors,
    ItemsLimit,
    isLoading,
    handleSubmit,
    onSubmit,
    register,
    setValue,
  }
}
