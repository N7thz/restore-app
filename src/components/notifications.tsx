"use client"

import { findNotification } from "@/actions/find-notification"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader, CardTitle
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Bell, Ellipsis, History, Loader2 } from "lucide-react"

export const Notifications = () => {

    const {
        data: notifications,
        isLoading,
        status,
        error,
        refetch
    } = useQuery({
        queryKey: ["find-all-notifications"],
        queryFn: () => findNotification()
    })

    if (isLoading) {
        return (
            <Button
                variant="outline">
                <Loader2 className="animate-spin" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
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
                            ? (
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
                            : (
                                <div className="divide-y-2">
                                    {
                                        notifications.map(({
                                            id,
                                            name,
                                            description,
                                            createdAt
                                        }) => (
                                            <Card key={id}>
                                                <CardHeader>
                                                    <CardTitle>
                                                        {name}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {description}
                                                    </CardDescription>
                                                    <CardAction>
                                                        <Button variant={"ghost"}>
                                                            <Ellipsis />
                                                        </Button>
                                                    </CardAction>
                                                </CardHeader>
                                                <CardFooter className="justify-end">
                                                    <CardDescription>
                                                        {
                                                            formatDate(
                                                                createdAt,
                                                                "dd 'de' MMMM 'de' yyyy 'as' HH:mm",
                                                                { locale: ptBR }
                                                            )
                                                        }
                                                    </CardDescription>
                                                </CardFooter>
                                            </Card>
                                        ))
                                    }
                                </div>
                            )
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
