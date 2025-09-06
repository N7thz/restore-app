import { ProductsCard } from "@/components/products-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Stoke App | Home"
}

export default async function Home() {
  return (
    <main className="h-container flex items-center justify-center p-8">
      <Card className="w-full h-5/6 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">
            Stoke App
          </CardTitle>
          <CardDescription>
            Ultimos produtos carregados
          </CardDescription>
        </CardHeader>
        <Separator />
        <ProductsCard />
        <Separator />
        <CardFooter className="justify-end gap-4">
          <Button
            asChild
            className="w-1/3"
          >
            <Link href="/create-products">
              <Plus className="group-hover:-translate-y-0.5 duration-200" />
              Registre um produto
            </Link>
          </Button>
          <Button
            asChild
            className="w-1/3"
            variant={"secondary"}
          >
            <Link href="/create-products-exit">
              <Minus className="group-hover:-translate-y-0.5 duration-200" />
              Saida Produto
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main >
  )
}