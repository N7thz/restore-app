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
import { Ellipsis } from "lucide-react"
import { Route } from "next"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Command } from "./ui/command"

const routes: { href: Route, text: string }[] = [
    {
        href: "/",
        text: "Home",
    },
    {
        href: "/create-products",
        text: "Registrar produto",
    },
    {
        href: "/create-products-exist",
        text: "Registrar saida de produto",
    },
    {
        href: "/products-exist",
        text: "Saida de produtos",
    },
    {
        href: "/help",
        text: "Ajuda",
    },
]

export const Header = () => {
    return (
        <header className="bg-card flex items-center justify-between px-4 py-2.5 border border-b-primary">
            <Sheet>
                <SheetTrigger>
                    <Avatar className="size-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                            <Ellipsis />
                        </AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent className="px-6" side="left">
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
                            <AvatarImage src="/sonic.gif" />
                            <AvatarFallback>
                                <Ellipsis />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>
                                Rotas:
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col space-y-2.5">
                            {
                                routes.map(({ href, text }) => (
                                    <Button
                                        key={href}
                                        asChild
                                        variant={"ghost"}
                                        className="justify-start"
                                    >
                                        <Link href={href}>
                                            {text}
                                        </Link>
                                    </Button>
                                ))
                            }
                        </CardContent>
                    </Card>
                </SheetContent>
            </Sheet>
            <div className="flex gap-2">
                <Command />
                <Notifications />
            </div>
        </header>
    )
}
