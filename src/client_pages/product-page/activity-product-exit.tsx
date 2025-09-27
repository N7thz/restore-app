import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ProductExit } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, Ellipsis } from "lucide-react"

export const ActivityProductExit = ({
    activityProduct: {
        id, createdAt, quantity, region, name
    }
}: { activityProduct: ProductExit }) => {

    const date = formatDate(createdAt, "PPP", { locale: ptBR })

    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle className="text-lg flex gap-2 text-destructive">
                    <ChevronDown />
                    Saída de produto
                </CardTitle>
                <CardDescription>
                    {date}
                </CardDescription>
                <CardAction>
                    <Ellipsis />
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className="font-extralight text-sm flex gap-2 items-start  whitespace-nowrap">
                    {quantity} unidade(s) entrege para
                    <span className="font-extrabold capitalize">
                        {name}
                    </span>
                    da região
                    <span className="font-extrabold capitalize">
                        {region}
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}