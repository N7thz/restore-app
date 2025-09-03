import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { InputCreateProductProps } from "@/schemas/create-product-exit-schema"
import { format, isDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

export const DatePicker = ({ index }: { index: number }) => {

	const [open, setOpen] = useState(false)

	const {
		setValue,
		watch,
		formState: { errors }
	} = useFormContext<InputCreateProductProps>()

	const date = watch(`products.${index}.date`)

	function onSelect(date: Date | undefined) {

		if (date === undefined) return

		setValue(`products.${index}.date`, date)
		setOpen(false)
	}

	return (
		<div className={cn(
			"flex flex-col gap-3 w-full",
			(errors.products?.[index]?.date && !isDate(date))
				? "border border-destructive rounded-lg"
				: isDate(date) && "border border-sucess rounded-lg"
		)}>
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-between font-normal",
							(errors.products?.[index]?.date && !isDate(date)) &&
							"text-destructive",
							isDate(date) && "text-primary-foreground"
						)}
					>
						{
							date
								? format(date, "P", { locale: ptBR })
								: errors.products?.[index]?.date
									? errors.products?.[index]?.date.message
									: "Selecione a data"
						}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="center"
					className="w-full overflow-hidden p-0"
				>
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						locale={ptBR}
						onSelect={onSelect}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
