"use client"

import { findNotification } from "@/actions/notifications/find-notification"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { Bell } from "lucide-react"
import { Separator } from "../ui/separator"
import { NotificationCard } from "./notification-card"
import { NotificationCardError } from "./notification-card-error"

export const Notifications = () => {

    const {
        data: notifications,
        isLoading,
        status,
        refetch
    } = useQuery({
        queryKey: ["find-all-notifications"],
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
            <DropdownMenuContent className="w-102" align="end">
                <DropdownMenuLabel>
                    Notificações
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    {
                        (status === "error" || !notifications)
                            ? <NotificationCardError refetch={refetch} />
                            : (<div>{notifications.map((notification, i) => {

                                const isLastItem = i === notifications.length - 1

                                return (
                                    <div key={notification.id}>
                                        {
                                            i === 0 &&
                                            <Separator />
                                        }
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
