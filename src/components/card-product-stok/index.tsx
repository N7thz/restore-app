import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Product } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CardProductStokMenu } from "./card-product-stok-menu"

export const CardProductStok = ({
    product: {
        id, createdAt, name, description, quantity
    }
}: { product: Product }) => {

    const data = formatDate(createdAt, "PPP", { locale: ptBR })

    return (
        <Card className="rounded-md h-36">
            <CardHeader>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>
                    {data}
                </CardDescription>
                <CardAction>
                    <CardProductStokMenu id={id} />
                </CardAction>
            </CardHeader>
            <CardContent>
                <p>
                    {description}
                </p>
                <p>
                    {quantity} unidades
                </p>
            </CardContent>
        </Card>
    )
}
