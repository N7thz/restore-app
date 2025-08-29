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
import Link from "next/link"

export default async function Home() {
  return (
    <main className="flex-1 flex items-center justify-center p-12">
      <Card className="w-full -mt-4 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">
            Stock App
          </CardTitle>
          <CardDescription>
            Registre os produtos que saíram do estoque
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
              <Plus />
              Registre um produto
            </Link>
          </Button>
          <Button
            asChild
            className="w-1/3"
          >
            <Link href="/create-products-exist">
              <Minus />
              Saida Produto
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}