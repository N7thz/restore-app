import { ModeToggle } from "@/components/mode-toogle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Ellipsis } from "lucide-react"

export default function Home() {
  return (
    <div className="size-full">
      <header className="bg-card flex items-center justify-between px-4 py-2.5 border-b">
        <Sheet>
          <SheetTrigger>
            <Avatar className="size-8">
              <AvatarImage src="/" />
              <AvatarFallback>
                <Ellipsis />
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </header>
      Hello world
    </div>
  )
}