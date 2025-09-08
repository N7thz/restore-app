import {
  FileClock,
  FileInput,
  FilePlus2,
  FileSearch,
  FileSpreadsheet,
  Info,
  LayoutPanelLeft,
  LucideIcon,
  Wallpaper,
} from "lucide-react"
import { Route as Href } from "next"

type Routes = {
  href: Href
  text: string
  Icon: LucideIcon
}

export const routes: readonly Routes[] = [
  {
    href: "/",
    text: "Home",
    Icon: LayoutPanelLeft,
  },
  {
    href: "/create-products",
    text: "Registrar produto",
    Icon: FilePlus2,
  },
  {
    href: "/create-products-exit",
    text: "Registrar saida de produto",
    Icon: FileInput,
  },
  {
    href: "/products-exit",
    text: "Tabela de saida de produtos",
    Icon: FileSpreadsheet,
  },
  {
    href: "/products",
    text: "Tabela de produtos",
    Icon: FileSpreadsheet,
  },
  {
    href: "/appearance",
    text: "Configurações",
    Icon: Wallpaper,
  },
  {
    href: "/help",
    text: "Ajuda",
    Icon: Info,
  },
]
