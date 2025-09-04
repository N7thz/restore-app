import {
    readAllNotification
} from "@/actions/notifications/read-all-notification"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMutation } from "@tanstack/react-query"
import { BellMinus } from "lucide-react"
import { queryClient } from "../theme-provider"
import { queryKeys } from "@/lib/query-keys"
import { toast } from "../toast"
import { Notification } from "@prisma/client"
import { ComponentProps } from "react"

export const ButtonReadAllNotifications = (
    props: ComponentProps<typeof Button>
) => {

    const { mutate } = useMutation({
        mutationKey: ["button-read-all-notifications"],
        mutationFn: () => readAllNotification(),
        onSuccess: (notifications) => {
            queryClient.setQueryData<Notification[]>(
                queryKeys.findAllNotifications(),
                (oldData) => {

                    if (!oldData) return notifications

                    const oldDataFilterd = oldData.filter(notification => {
                        return notification.action === "MIN_QUANTITY"
                    })

                    return [...oldDataFilterd, ...notifications]
                }
            )
        },
        onError: (err) => toast({
            title: "Não foi possivel excluir as notificações",
            description: (
                <span className="text-muted-foreground">
                    {err.message}
                </span>
            )
        })
    })

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={() => mutate()}
                    {...props}
                >
                    <BellMinus className="group-hover:-translate-y-0.5 duration-200" />
                </Button>
            </TooltipTrigger>
            <TooltipContent align="start">
                <p>
                    Marcar todas como lidas
                </p>
            </TooltipContent>
        </Tooltip>
    )
}