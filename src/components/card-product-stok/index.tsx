import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Product } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CardProductStokMenu } from "./card-product-stok-menu"
import Link from "next/link"

export const CardProductStok = ({
	product: { id, createdAt, name, description, quantity },
}: {
	product: Product
}) => {
	const data = formatDate(createdAt, "PPP", { locale: ptBR })

	return (
		<Card className="rounded-md size-full justify-between">
			<CardHeader>
				<Link href={`/products/${id}`} className="hover:text-primary">
					<CardTitle className="text-lg truncate max-w-40 ">{name}</CardTitle>
					<CardDescription>{data}</CardDescription>
				</Link>
				<CardAction>
					<CardProductStokMenu id={id} />
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground truncate">{description}</p>
			</CardContent>
			<CardFooter className="justify-end">
				<p className="text-sm text-muted-foreground truncate">
					{quantity} unidades
				</p>
			</CardFooter>
		</Card>
	)
}
