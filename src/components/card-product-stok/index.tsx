import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
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
        <Card className="rounded-md">
            <CardHeader>
                <CardTitle className="text-lg">
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
                <p className="text-sm text-muted-foreground truncate">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="justify-end">
                <p className="text-sm text-muted-foreground truncate">
                    {quantity} unidades
                </p>
            </CardFooter>
        </Card>
    )
}
