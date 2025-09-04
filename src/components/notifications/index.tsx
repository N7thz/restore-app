"use client"

import { findNotification } from "@/actions/notifications/find-notification"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { queryKeys } from "@/lib/query-keys"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { Bell, BellRing, Loader2 } from "lucide-react"
import { ButtonDeleteAllNotifications } from "./button-delete-all-notifications"
import { ButtonOrderAllNotifications } from "./button-order-all-notifications"
import { ButtonReadAllNotifications } from "./button-read-all-notifications"
import { NotificationCard } from "./notification-card"
import { NotificationCardError } from "./notification-card-error"

export const Notifications = () => {

    const {
        data: notifications,
        isLoading,
        status,
        refetch
    } = useQuery({
        queryKey: queryKeys.findAllNotifications(),
        queryFn: () => findNotification()
    })

    if (isLoading || !notifications) {
        return (
            <Button
                variant="outline"
                size="icon"
                className="relative"
                aria-label="Notifications"
            >
                <Bell size={16} aria-hidden="true" />
                <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                    <Loader2 className="animate-spin" />
                </Badge>
            </Button>
        )
    }

    const count = notifications.filter(({ read }) => read === false).length

    const buttonReadDisabled = notifications.some(
        notification =>
            notification.action !== "MIN_QUANTITY" &&
            notification.read === false
    )

    const buttonDeleteDisabled = notifications.some(notification => notification.action !== "MIN_QUANTITY")

    console.log(buttonReadDisabled)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                >
                    <BellRing className="size-4" />
                    {count > 0 && (
                        <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                            {count > 99 ? "99+" : count}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent asChild align="end">
                <div className="w-100">
                    <DropdownMenuLabel className="text-base">
                        Notificações
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-base grid grid-cols-2 gap-2 w-full">
                        <ButtonReadAllNotifications
                            disabled={!buttonReadDisabled}
                        />
                        <ButtonDeleteAllNotifications
                            disabled={!buttonDeleteDisabled}
                        />
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="h-104 w-full">
                        <ScrollBar />
                        <DropdownMenuGroup>
                            {
                                (status === "error" || !notifications)
                                    ? <NotificationCardError refetch={refetch} />
                                    : (
                                        <div>
                                            {
                                                notifications.map((notification, i) => {
                                                    const isLastItem = i === notifications.length - 1
                                                    return (
                                                        <div
                                                            key={notification.id}
                                                        >
                                                            <NotificationCard
                                                                notification={notification}
                                                            />
                                                            {
                                                                !isLastItem &&
                                                                <Separator />
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                            }
                        </DropdownMenuGroup>
                    </ScrollArea>
                </div>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
