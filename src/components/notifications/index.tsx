"use client"

import { findNotification } from "@/actions/notifications/find-notification"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { queryKeys } from "@/lib/query-keys"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { Bell } from "lucide-react"
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

    if (isLoading) {
        return (
            <Button variant="ghost">
                <Bell />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Bell />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                asChild
                align="end"
            >
                <div>
                    <DropdownMenuLabel className="text-base">
                        Notificações
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="size-104">
                        <ScrollBar />
                        <DropdownMenuGroup>
                            {
                                (status === "error" || !notifications)
                                    ? <NotificationCardError refetch={refetch} />
                                    : (<div>{notifications.map((notification, i) => {

                                        const isLastItem = i === notifications.length - 1

                                        return (
                                            <div key={notification.id}>
                                                <NotificationCard
                                                    notification={notification}
                                                />
                                                {
                                                    !isLastItem &&
                                                    <Separator />
                                                }
                                            </div>
                                        )
                                    })} </div>)
                            }
                        </DropdownMenuGroup>
                    </ScrollArea>
                </div>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
