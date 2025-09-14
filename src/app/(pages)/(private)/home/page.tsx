import { ProductsCard } from "@/components/products-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home | Stoke App",
}

export default async function Home() {
  return (
    <main
      className={cn(
        "h-container flex items-center justify-center p-8",
        "max-sm:px-4"
      )}
    >
      <Card className={cn("w-full h-5/6 border-primary", "xl:w-3/5")}>
        <CardHeader>
          <CardTitle className="text-2xl">Stoke App</CardTitle>
          <CardDescription>Ultimos produtos carregados</CardDescription>
        </CardHeader>
        <Separator />
        <ProductsCard />
        <Separator />
        <CardFooter className={cn("justify-end gap-4", "max-sm:flex-col")}>
          <Button asChild className={cn("w-1/3", "max-sm:w-full")}>
            <Link href="/create-products">
              <Plus className="group-hover:-translate-y-0.5 duration-200" />
              Registre um produto
            </Link>
          </Button>
          <Button
            asChild
            className={cn("w-1/3", "max-sm:w-full")}
            variant={"secondary"}
          >
            <Link href="/create-products-exit">
              <Minus className="group-hover:-translate-y-0.5 duration-200" />
              Saida Produto
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
