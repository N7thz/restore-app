import { queryClient } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { queryKey } from "@/lib/query-keys"
import { Action, Notification } from "@prisma/client"
import { ArrowDownUp } from "lucide-react"

export const ButtonOrderAllNotifications = ({
  notifications,
}: {
  notifications: Notification[]
}) => {
  function sortedByPriorityCategory() {
    return notifications.sort((a, b) => {
      const priorityCategories = ["MIN_QUANTITY", "name"]

      const aIsPriority = priorityCategories.includes(a.action)
      const bIsPriority = priorityCategories.includes(b.action)

      if (aIsPriority && !bIsPriority) return -1
      if (!aIsPriority && bIsPriority) return 1
      if (aIsPriority && bIsPriority) {
        return a.name.localeCompare(b.name)
      }

      const categoryCompare = a.action.localeCompare(b.action)

      if (categoryCompare !== 0) return categoryCompare

      return a.name.localeCompare(b.name)
    })
  }

  const orderedNotifications = sortedByPriorityCategory()

  function orderAllNotification() {
    queryClient.setQueryData<Notification[]>(
      queryKey.findAllNotifications(),
      orderedNotifications
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"outline"} onClick={orderAllNotification}>
          <ArrowDownUp className="group-hover:-translate-y-0.5 duration-200" />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="end" className="bg-border">
        <p>Ordernar notificações</p>
      </TooltipContent>
    </Tooltip>
  )
}
