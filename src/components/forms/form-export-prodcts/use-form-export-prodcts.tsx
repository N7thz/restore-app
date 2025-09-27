import {
	FindManyProductsWithFilterProps as FindManyProductsProps,
	findManyProductsWithFilter,
} from "@/actions/products/find-many-products-with-filter"
import { toast } from "@/components/toast"
import { allColumns } from "@/data/all-columns-products"
import { exportFormattedExcel } from "@/lib/advanced-excel-export"
import { queryKey } from "@/lib/query-keys"
import { validateErrors } from "@/lib/zod"
import {
	inputExportProdctsSchema,
	InputExportProdctsSchema,
	ouputExportProdctsSchema,
	OuputExportProdctsSchema,
} from "@/schemas/export-table-products"
import { ItemsLimitProps } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet } from "lucide-react"
import { useForm } from "react-hook-form"

export function useFormExportProdcts(setOpen: (open: boolean) => void) {
	const { mutate } = useMutation({
		mutationKey: queryKey.exportTableProducts(),
		mutationFn: ({ products, takeString }: FindManyProductsProps) =>
			findManyProductsWithFilter({
				products,
				takeString,
			}),
		onSuccess: async data => {
			const dataKeys = Object.keys(data[0])

			const columns = allColumns.filter(column => dataKeys.includes(column.key))

			const tableData = data.map(item => {
				const { createdAt } = item

				return {
					...item,
					createdAt: formatDate(createdAt, "P", { locale: ptBR }),
				}
			})

			await exportFormattedExcel(tableData, columns, {
				fileName: "produtos_exportados",
				sheetName: "produtos",
			})

			toast({
				title: "Os dados foram exportados com sucesso.",
				description: `${data.length} itens foram exportados.`,
				duration: 3000,
				icon: <Sheet className="size-4 text-primary" />,
				onAutoClose: () => setOpen(false),
			})
		},
		onError: error => {
			console.log(error)

			toast({
				title: error.message,
				description: "Tente passar um intervalo diferente",
				variant: "error",
			})
		},
	})

	const form = useForm<InputExportProdctsSchema>({
		resolver: zodResolver(inputExportProdctsSchema),
		reValidateMode: "onChange",
		defaultValues: {
			id: true,
			name: true,
			description: true,
			price: true,
			quantity: true,
			minQuantity: true,
			createdAt: true,
		},
	})

	const {
		watch,
		register,
		setValue,
		setError,
		handleSubmit,
		formState: { errors },
	} = form

	function onSubmit({ dateStart, dateEnd, ...rest }: InputExportProdctsSchema) {
		const { error, data } = ouputExportProdctsSchema.safeParse({
			dateStart: dateStart !== "" ? new Date(dateStart) : new Date(),
			dateEnd: dateEnd !== "" ? new Date(dateEnd) : new Date(),
			...rest,
		})

		if (error) {
			return validateErrors<OuputExportProdctsSchema>(error, setError)
		}

		mutate({
			products: data,
			takeString: data.itemsLimit as ItemsLimitProps,
		})
	}

	const ItemsLimit = ["10", "25", "30", "40", "50", "100", "todos"]

	return {
		watch,
		form,
		errors,
		ItemsLimit,
		handleSubmit,
		onSubmit,
		register,
		setValue,
	}
}
