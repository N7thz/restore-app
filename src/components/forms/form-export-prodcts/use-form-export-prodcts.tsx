import {
    findManyProductsWithFilter,
    FindManyProductsWithFilterProps as FindManyProductsProps
} from "@/actions/products/find-many-products-with-filter"
import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { validateErrors } from "@/lib/zod"
import { allColumns, itemsLimit, ItemsLimitProps, productKeyOfs } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "@/components/toast"
import { exportFormattedExcel } from "@/lib/advanced-excel-export"
import {
    inputExportProdctsSchema,
    InputExportProdctsSchema,
    ouputExportProdctsSchema,
    OuputExportProdctsSchema
} from "@/schemas/export-table-products"
import { Sheet } from "lucide-react"

export function useFormExportProdcts({
    setOpen
}: { setOpen: (open: boolean) => void }) {

    const { mutate } = useMutation({
        mutationKey: ["export-table-products"],
        mutationFn: ({ products, takeString }: FindManyProductsProps) => findManyProductsWithFilter({
            products,
            takeString,
        }),
        onSuccess: (data) => {

            const dataKeys = Object.keys(data[0])

            const columns = allColumns.filter(column => dataKeys.includes(column.key))

            console.log(columns)

            exportFormattedExcel(data, columns, {
                fileName: 'produtos_exportados',
                sheetName: 'produtos',
            })

            toast({
                title: "Os dados foram exportados com sucesso.",
                description: `${data.length} itens foram exportados.`,
                duration: 3000,
                icon: <Sheet className="size-4 text-primary" />,
                onAutoClose: () => setOpen(false)
            })
        },
        onError: (error) => toast({
            title: error.message,
            description: "Não foi possivel encontrar os dados desejados foi possivel encontrar os dados desejados",
            variant: "error",
        })
    })

    const form = useForm<InputExportProdctsSchema>({
        resolver: zodResolver(inputExportProdctsSchema),
        reValidateMode: "onChange"
    })

    const {
        register,
        setValue,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting }
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