import { FormCreateProduct } from "@/components/forms/form-create-product"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "stock App | Registrar produto",
}

export default function CreateProduct() {
    return (
        <main className="h-container flex items-center justify-center p-8">
            <Card className="w-1/2 border-primary text-2xl">
                <CardHeader>
                    <CardTitle>
                        Registre um produto
                    </CardTitle>
                    <CardDescription>
                        Registre um produto ao estoque
                    </CardDescription>
                </CardHeader>
                <FormCreateProduct />
            </Card>
        </main>
    )
}