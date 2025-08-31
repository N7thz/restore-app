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
import { cn } from "@/lib/utils"
import { Notification } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CheckCircle, CircleAlert, Ellipsis, Icon, Info, TriangleAlert, XCircle } from "lucide-react"

type NotificationCardProps = {
  notification: Notification
}

export const NotificationCard = ({
  notification: {
    name, description, createdAt, action
  }
}: NotificationCardProps) => {

  const date = formatDate(
    createdAt,
    "dd 'de' MMMM 'de' yyyy 'as' HH:mm",
    { locale: ptBR }
  )

  const useAction = (
    action: "CREATE" | "UPDATE" | "DELETE" | "MIN_QUANTITY") => {

    if (action === "CREATE") {
      return CheckCircle
    } else if (action === "UPDATE") {
      return CircleAlert
    } else if (action === "DELETE") {
      return XCircle
    }

    return TriangleAlert
  }

  const Icon = useAction(action as "CREATE" | "UPDATE" | "DELETE" | "MIN_QUANTITY")

  return (
    <Card className="py-2.5 gap-0 ">
      <CardHeader className="py-4">
        <CardTitle className="truncate text-base flex items-center gap-2 capitalize">
          <Icon className={cn(
            "size-4",
            action === "CREATE"
              ? "text-green-500"
              : action === "UPDATE"
                ? "text-yellow-500"
                : action === "DELETE"
                  ? "text-destructive"
                  : "text-primary"
          )} />
          {name}
        </CardTitle>
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
