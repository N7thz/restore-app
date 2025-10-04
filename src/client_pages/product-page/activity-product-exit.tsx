import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ProductExit } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, Edit, Ellipsis } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DialogDeleteProductExit } from "../data-table-products-exit/columns/dialog-delete-product-exit"
import { ComponentProps, useState } from "react"

type ActivityProductExitProps = ComponentProps<typeof Card> & {
	activityProduct: ProductExit
}

export const ActivityProductExit = ({
	activityProduct: {
		id, createdAt, quantity, region, name
	},
	...props
}: ActivityProductExitProps) => {

	const [open, setOpen] = useState(false)

	const date = formatDate(createdAt, "PPP", { locale: ptBR })

	return (
		<Card
			key={id}
			{...props}
		>
			<CardHeader>
				<CardTitle className="text-lg flex gap-2 text-destructive">
					<ChevronDown />
					Saída de produto
				</CardTitle>
				<CardDescription>{date}</CardDescription>
				<CardAction>
					<DropdownMenu open={open} onOpenChange={setOpen}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size={"icon"}>
								<span className="sr-only">Open menu</span>
								<Ellipsis className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-52">
							<DropdownMenuLabel>Opções</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/update-product-exit/${id}`}>
									<Edit className="size-4" />
									Editar
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<DialogDeleteProductExit
									id={id}
									setOpen={setOpen}
								/>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="font-extralight text-sm flex gap-2 items-start truncate">
					{quantity} unidade(s) entrege para
					<span className="font-extrabold capitalize">{name}</span>
					da região
					<span className="font-extrabold capitalize">{region}</span>
				</p>
			</CardContent>
		</Card>
	)
}
