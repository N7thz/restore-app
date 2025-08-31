import {
    FileClock,
    FileInput,
    FilePlus2,
    FileSearch,
    Info,
    LayoutPanelLeft,
    LucideIcon,
    Wallpaper
} from "lucide-react"
import { Route as Href } from "next"

type Routes = {
    href: Href,
    text: string
    Icon: LucideIcon
}

export const routes: readonly Routes[] =[
    {
        href: "/",
        text: "Home",
        Icon: LayoutPanelLeft
    },
    {
        href: "/create-products",
        text: "Registrar produto",
        Icon: FilePlus2
    },
    {
        href: "/create-products-exist",
        text: "Registrar saida de produto",
        Icon: FileInput
    },
    {
        href: "/products-exist",
        text: "Histórico saida de produtos",
        Icon: FileClock
    },
    {
        href: "/products",
        text: "Histórico de produtos",
        Icon: FileSearch
    },
    {
        href: "/help",
        text: "Ajuda",
        Icon: Info
    },
    {
        href: "/appearance",
        text: "Aparência",
        Icon: Wallpaper
    },
]