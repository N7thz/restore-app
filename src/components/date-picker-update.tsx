import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { OutputProductExitObjectProps } from "@/schemas/product-exit-object"
import { format, isDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

export const DatePickerUpdate = () => {

	const [open, setOpen] = useState(false)

	const {
		setValue,
		watch,
	} = useFormContext<OutputProductExitObjectProps>()

	const date = watch("createdAt")

	return (
		<div className="flex flex-col gap-3 w-full">
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between font-normal text-primary-foreground">
						{
							date
								? format(date, "P", { locale: ptBR })
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
						onSelect={(date) => {
							isDate(date)
								? setValue("createdAt", date)
								: setValue("createdAt", new Date())
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
