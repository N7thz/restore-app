import { readAllNotification } from "@/actions/notifications/read-all-notification"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { queryKey } from "@/lib/query-keys"
import { Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { BellMinus } from "lucide-react"
import { ComponentProps } from "react"

export const ButtonReadAllNotifications = (
  props: ComponentProps<typeof Button>
) => {
  const { mutate } = useMutation({
    mutationKey: queryKey.buttonReadAllNotifications(),
    mutationFn: () => readAllNotification(),
    onSuccess: notifications => {
      queryClient.setQueryData<Notification[]>(
        queryKey.findAllNotifications(),
        oldData => {
          if (!oldData) return notifications

          const oldDataFilterd = oldData.filter(notification => {
            return notification.action === "MIN_QUANTITY"
          })

          return [...oldDataFilterd, ...notifications]
        }
      )
    },
    onError: (err) => {

      console.log(err)

      toast({
        title: "Não foi possivel excluir as notificações",
        description: `${err.message}`,
      })
    }
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => mutate()} {...props}>
          <BellMinus className="group-hover:-translate-y-0.5 duration-200" />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>Marcar todas como lidas</p>
      </TooltipContent>
    </Tooltip>
  )
}
