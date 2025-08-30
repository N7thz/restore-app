import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { History } from "lucide-react"

export const NotificationCardError = ({ refetch }:  {refetch: () => void}) => {
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>
                    Não foi possível carregar as notificações
                </CardTitle>
            </CardHeader>
            <CardFooter>
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => refetch()}
                >
                    <History />
                    Tentar novamente
                </Button>
            </CardFooter>
        </Card>
    )
}
