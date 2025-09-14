import { FormCreateProductExit } from "@/components/forms/form-create-product-exit"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registrar saida de produto | Stock App",
}

export default function CreateProductExit() {
  return (
    <main className="h-container flex items-center justify-center p-8">
      <Card className={cn(
        "w-1/2 border-primary",
        "max-sm:w-full",
        "max-md:w-10/12 md:w-4/5",
        "xl:w-2/5"
      )}>
        <CardHeader>
          <CardTitle>Registre um produto</CardTitle>
          <CardDescription>Registre um produto ao estoque</CardDescription>
        </CardHeader>
        <FormCreateProductExit />
      </Card>
    </main>
  )
}
