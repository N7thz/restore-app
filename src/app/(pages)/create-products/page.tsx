import { FormCreateProduct } from "@/components/forms/form-create-product"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "stock App | Registrar produto",
}

export default function CreateProduct() {
    return (
        <main className="flex-1 flex items-center justify-center p-12">
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
                <CardFooter>
                    <Button
                        type="submit"
                        form="form-create-products"
                    >
                        Confirmar
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}