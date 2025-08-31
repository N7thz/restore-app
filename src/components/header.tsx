"use client"

import { Command } from "@/components/command"
import { Notifications } from "@/components/notifications"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Ellipsis, Home, LucideIcon } from "lucide-react"
import { Route as Href } from "next"
import { useState } from "react"

export const Header = () => {

    const [open, setOpen] = useState(false)

    return (
        <header className="bg-card flex items-center justify-between px-4 py-2.5 border border-b-primary">
            <Sheet
                open={open}
                onOpenChange={setOpen}
            >
                <SheetTrigger>
                    <Avatar className="size-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                            <Ellipsis />
                        </AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="px-6 border-primary"
                >
                    <SheetHeader>
                        <SheetTitle>
                            Opções
                        </SheetTitle>
                        <SheetDescription>
                            Opções do app e preferências
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mx-auto">
                        <Avatar className="size-48">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>
                                <Ellipsis />
                            </AvatarFallback>
                        </Avatar>
                    </div>

                </SheetContent>
            </Sheet>
            <div className="flex gap-2">
                <Command />
                <Notifications />
            </div>
        </header>
    )
}
