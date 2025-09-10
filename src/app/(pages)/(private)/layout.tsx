import { Header } from "@/components/header"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ReactNode } from "react"

export default function PrivateLayout({ children }: { children: ReactNode }) {
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