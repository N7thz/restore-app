import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ProductEntry } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronUp } from "lucide-react"
import { CardProductEntryMenu } from "./card-product-stok-menu"

export const ActivityProductEntry = ({
	activityProduct,
	name,
}: {
	activityProduct: ProductEntry
	name: string
}) => {
	const { id, createdAt, quantity, price } = activityProduct

	const date = formatDate(createdAt, "PPP", { locale: ptBR })

	return (
		<Card key={id}>
			<CardHeader>
				<CardTitle className="text-lg flex gap-2 text-emerald-600">
					<ChevronUp />
					Entrada de produto
				</CardTitle>
				<CardDescription>{date}</CardDescription>
				<CardAction>
					<CardProductEntryMenu name={name} productEntry={activityProduct} />
				</CardAction>
			</CardHeader>
			<CardContent>
				<span className="font-extralight text-sm">
					{quantity} unidades por R$ {price.toFixed(2)}
				</span>
				<span className="font-extralight text-sm text-muted-foreground">
					{` - Total R$ ${(quantity * price).toFixed(2)}`}
				</span>
			</CardContent>
		</Card>
	)
}
