import { FormUpdateProductExit } from "@/components/forms/form-update-product-exit"
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

export default async function UpdateProductExit({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    return (
        <main className="h-container flex items-center justify-center p-8" >
            <Card className="w-1/2 border-primary text-2xl" >
                <CardHeader>
                    <CardTitle>
                        Atualizar saida de produto
                    </CardTitle>
                    <CardDescription>
                        Atualize uma saida de um produto
                    </CardDescription>
                </CardHeader>
                <FormUpdateProductExit id={id} />
            </Card>
        </main>
    )
}