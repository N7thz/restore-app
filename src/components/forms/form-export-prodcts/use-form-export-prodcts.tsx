import {
    FindManyProductsWithFilterProps as FindManyProductsProps,
    findManyProductsWithFilter
} from "@/actions/products/find-many-products-with-filter"
import { toast } from "@/components/toast"
import { exportFormattedExcel } from "@/lib/advanced-excel-export"
import { validateErrors } from "@/lib/zod"
import {
    inputExportProdctsSchema,
    InputExportProdctsSchema,
    ouputExportProdctsSchema,
    OuputExportProdctsSchema
} from "@/schemas/export-table-products"
import { allColumns, ItemsLimitProps } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Sheet } from "lucide-react"
import { useForm } from "react-hook-form"

export function useFormExportProdcts() {

    const { mutate } = useMutation({
        mutationKey: ["export-table-products"],
        mutationFn: ({ products, takeString }: FindManyProductsProps) => findManyProductsWithFilter({
            products,
            takeString,
        }),
        onSuccess: (data) => {

            console.log(data)

            const dataKeys = Object.keys(data[0])

            const columns = allColumns.filter(column => dataKeys.includes(column.key))

            console.log(columns)

            exportFormattedExcel(data, columns, {
                fileName: 'produtos_exportados',
                sheetName: 'produtos',
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
            })
        },
        onError: (error) => {

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
        }
    })

    const form = useForm<InputExportProdctsSchema>({
        resolver: zodResolver(inputExportProdctsSchema),
        reValidateMode: "onChange",
    })

    const {
        register,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = form

    function onSubmit({
        dateStart,
        dateEnd,
        ...rest
    }: InputExportProdctsSchema) {

        const { error, data } = ouputExportProdctsSchema.safeParse({
            dateStart: new Date(dateStart),
            dateEnd: new Date(dateEnd),
            ...rest
        })

        if (error) {
            return validateErrors<OuputExportProdctsSchema>(error, setError)
        }

        mutate({
            products: data,
            takeString: data.itemsLimit as ItemsLimitProps
        })
    }

    const ItemsLimit = ["10", "25", "30", "40", "50", "100", "todos"]

    return {
        form,
        errors,
        ItemsLimit,
        handleSubmit,
        onSubmit,
        register,
        setValue,
    }
}