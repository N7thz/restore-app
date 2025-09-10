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
import { Ellipsis, Info, LogOut, Settings, UserCircle, UserCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler"
import { Button } from "./ui/button"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { authenticate } from "@/actions/autheticate/autheticate"
import { deleteCookie } from "cookies-next"
import { redirect } from "next/navigation"

export const Header = () => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener("keydown", down)

    return () => document.removeEventListener("keydown", down)
  }, [])

  const token = getCookie("token")

  const { data, isLoading } = useQuery({
    queryKey: ["authenticate-user"],
    queryFn: () => authenticate(token)
  })

  if (isLoading || !data) {
    return (
      <header className="bg-card flex items-center justify-between px-4 py-2.5 border border-b-primary">
        <Avatar className="size-8">
          <AvatarImage />
          <AvatarFallback>
            <Ellipsis />
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <AnimatedThemeToggler />
          <Notifications />
        </div>
      </header>
    )
  }

  const { imageUrl, username } = data

  return (
    <header className="bg-card flex items-center justify-between px-4 py-2.5 border border-b-primary">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Avatar className="size-8">
            <AvatarImage src={imageUrl ?? undefined} />
            <AvatarFallback>
              <UserCircle2 />
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side="left" className="px-6 border-primary">
          <SheetHeader>
            <SheetTitle>
              {`Olá ${username}`}
            </SheetTitle>
            <SheetDescription>
              Veja as opções do app e preferências
            </SheetDescription>
          </SheetHeader>
          <Avatar className="size-50 mx-auto">
            <AvatarImage src={imageUrl ?? undefined} />
            <AvatarFallback>
              <UserCircle2
                strokeWidth={0.2}
                className="size-48"
              />
            </AvatarFallback>
          </Avatar>
          <SheetFooter className="w-full flex p-0 pb-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                asChild
                variant={"secondary"}
              >
                <Link
                  href={"/appearance"}
                  onNavigate={() => {
                    setTimeout(() => setOpen(false), 800)
                  }}
                >
                  <Settings className="group-hover:rotate-180 duration-200" />
                </Link>
              </Button>
              <Button
                asChild
                variant={"secondary"}
              >
                <Link
                  href={"/help"}
                  onNavigate={() => {
                    setTimeout(() => setOpen(false), 800)
                  }}
                >
                  <Info />
                </Link>
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                deleteCookie("token")
                redirect("/sign-in")
              }}
            >
              Sair
              <LogOut />
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
