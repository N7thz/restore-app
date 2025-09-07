"use client"

import { Command } from "@/components/command"
import { Notifications } from "@/components/notifications"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getCookie } from "cookies-next/client"
import { Ellipsis, Info, Settings } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler"
import { Button } from "./ui/button"

export const Header = () => {

    const [open, setOpen] = useState(false)

    useEffect(() => {

        const down = (e: KeyboardEvent) => {
            if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)

        return () => document.removeEventListener("keydown", down)
    }, [])

    const userIcon = getCookie("user-icon")

    const defaultUrl = userIcon ? `/uploads/${userIcon}` : "https://github.com/shadcn.png"

    return (
        <header className="bg-card flex items-center justify-between px-4 py-2.5 border border-b-primary">
            <Sheet
                open={open}
                onOpenChange={setOpen}
            >
                <SheetTrigger>
                    <Avatar className="size-8">
                        <AvatarImage src={defaultUrl} />
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
                            <AvatarImage src={defaultUrl} />
                            <AvatarFallback>
                                <Ellipsis />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <SheetFooter className="w-full grid grid-cols-2 p-0 pb-4">
                        <Button asChild>
                            <Link
                                href={"/settings"}
                                onNavigate={() => {
                                    setTimeout(() => setOpen(false), 800)
                                }}
                            >
                                <Settings className="group-hover:animate-spin duration-200" />
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link
                                href={"/help"}
                                onNavigate={() => {
                                    setTimeout(() => setOpen(false), 800)
                                }}
                            >
                                <Info />
                            </Link>
                        </Button>
                    </SheetFooter>

                </SheetContent>
            </Sheet>
            <div className="flex gap-2">
                <AnimatedThemeToggler />
                <Command />
                <Notifications />
            </div>
        </header>
    )
}
