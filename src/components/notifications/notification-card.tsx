import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Action, Notification } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  BellMinus,
  BellOff,
  CheckCircle,
  CircleAlert,
  Ellipsis,
  TriangleAlert,
  XCircle,
} from "lucide-react"
import { useNotificationCard } from "./use-notification-card"

export type NotificationCardProps = {
  notification: Notification
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { read, name, description, action } = notification

  const { Icon, date, deleteNotification, readNotification } =
    useNotificationCard({ notification })

  return (
    <Card
      className={cn(
        "py-2.5 gap-0 border-none shadow-none rounded-none",
        read && "bg-secondary"
      )}
    >
      <CardHeader className="py-4">
        <CardTitle
          className={cn(
            "truncate text-base flex items-center gap-2 capitalize",
            read && "text-muted-foreground"
          )}
        >
          <Icon
            className={cn(
              "size-4",
              action === "CREATE"
                ? "text-green-500"
                : action === "UPDATE"
                  ? "text-yellow-500"
                  : action === "DELETE"
                    ? "text-destructive"
                    : "text-primary"
            )}
          />
          {name}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <DropdownMenuSub>
          <CardAction>
            <Button asChild variant={"ghost"}>
              <DropdownMenuSubTrigger Icon={Ellipsis} />
            </Button>
          </CardAction>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={readNotification}>
                <BellMinus />
                Marcar com lida
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteNotification}>
                <BellOff />
                Exclur
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </CardHeader>
      <CardFooter className="justify-end">
        <CardDescription>{date}</CardDescription>
      </CardFooter>
    </Card>
  )
}
