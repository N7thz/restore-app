import { FormExportProdcts } from "@/components/forms/form-export-prodcts"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"
import { ComponentProps } from "react"

type DialogExportDataProps = ComponentProps<typeof Dialog> & {
	disabled?: boolean
}

export const DialogExportData = ({
	children,
	disabled,
	...props
}: DialogExportDataProps) => {
	return (
		<Dialog {...props}>
			<DialogTrigger disabled={disabled} asChild>
				<Button variant={"outline"} className={cn("dark:hover:bg-emerald-600")}>
					<Download className="group-hover:-translate-y-0.5 duration-200" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Exportar dados</DialogTitle>
					<DialogDescription>
						Selecione os dados a serem exportados
					</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}
