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

export const createdAtPicker = ({ index }: { index: number }) => {

	const [open, setOpen] = useState(false)

	const {
		setValue,
		watch,
		formState: { errors }
	} = useFormContext<InputCreateProductProps>()

	const createdAt = watch(`products.${index}.createdAt`)

	function onSelect(createdAt: Date | undefined) {

		if (createdAt === undefined) return

		setValue(`products.${index}.createdAt`, createdAt)
		setOpen(false)
	}

	return (
		<div className={cn(
			"flex flex-col gap-3 w-full",
			(errors.products?.[index]?.createdAt && !isDate(createdAt))
				? "border border-destructive rounded-lg"
				: isDate(createdAt) && "border border-sucess rounded-lg"
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
							(errors.products?.[index]?.createdAt && !isDate(createdAt)) &&
							"text-destructive",
							isDate(createdAt) && "text-primary-foreground"
						)}
					>
						{
							createdAt
								? format(createdAt, "P", { locale: ptBR })
								: errors.products?.[index]?.createdAt
									? errors.products?.[index]?.createdAt.message
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
						selected={createdAt}
						captionLayout="dropdown"
						locale={ptBR}
						onSelect={onSelect}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
