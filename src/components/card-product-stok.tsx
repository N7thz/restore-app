import { Button } from "@/components/ui/button"
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
import { Ellipsis } from "lucide-react"

export const CardProductStok = ({
    product: {
        id, createdAt, name, description, quantity
    }
}: { product: Product }) => {

    const data = formatDate(createdAt, "PPP", { locale: ptBR })

    return (
        <Card
            key={id}
            className="rounded-md"
        >
            <CardHeader>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>
                    {data}
                </CardDescription>
                <CardAction>
                    <Button
                        size={"icon"}
                        variant={"outline"}
                    >
                        <Ellipsis />
                    </Button>
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
