import { Header } from "@/components/header"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ReactNode } from "react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function PrivateLayout({
    children
}: { children: ReactNode }) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) redirect("/sign-in") 

    return (
        <div className="flex flex-col h-dvh itemce">
            <Header />
            <ScrollArea className="h-container flex overflow-y-hidden">
                <ScrollBar />
                {children}
            </ScrollArea>
        </div>
    )
}