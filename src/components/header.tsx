import { ModeToggle } from "@/components/mode-toogle"
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
import { Notifications } from "./notifications"

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
            <div className="flex gap-2">
                <Notifications />
                <ModeToggle />
            </div>
        </header>
    )
}
