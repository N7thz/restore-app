import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Notification } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Ellipsis } from "lucide-react"

type NotificationCardProps = {
  notification: Notification
}

export const NotificationCard = ({
  notification: {
    name, description, createdAt
  }
}: NotificationCardProps) => {

  const date = formatDate(
    createdAt,
    "dd 'de' MMMM 'de' yyyy 'as' HH:mm",
    { locale: ptBR }
  )

  return (
    <Card className="py-2.5 gap-0 border-none">
      <CardHeader className="py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="truncate">
              {name}
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              {name}
            </p>
          </TooltipContent>
        </Tooltip>
        {
          description &&
          <CardDescription>
            {description}
          </CardDescription>
        }
        <CardAction>
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="justify-end">
        <CardDescription>
          {date}
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
