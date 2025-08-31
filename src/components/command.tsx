"use client"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { routes } from "@/utils/route"
import { redirect, RedirectType } from "next/navigation"
import { useEffect, useState } from "react"

export const Command = () => {

    const [open, setOpen] = useState(false)

    useEffect(() => {

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)

        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                className="border-primary"
            >
                <CommandInput placeholder="Pesquise uma opção..." />
                <CommandList>
                    <CommandEmpty className="text-base text-muted-foreground">
                        Não foi encontrado o resultado.
                    </CommandEmpty>
                    <ScrollArea className="h-[320px] p-1.5">
                        <ScrollBar />
                        <CommandGroup heading="Opções">
                            {
                                routes.map(({ href, text, Icon }) => (
                                    <CommandItem
                                        key={href}
                                        onSelect={() => {
                                            setTimeout(() => setOpen(false), 800)
                                            redirect(href, RedirectType.push)
                                        }}
                                    >
                                        {text}
                                        <CommandShortcut>
                                            <Icon />
                                        </CommandShortcut>
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </ScrollArea>
                </CommandList>
            </CommandDialog >
        </>
    )
}