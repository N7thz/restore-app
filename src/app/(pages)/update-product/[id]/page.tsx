import { FormUpdateProduct } from "@/components/forms/form-update-product"
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

export default async function UpdateProduct({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    return (
        <main className="flex-1 flex items-center justify-center">
            <Card className="w-1/2 border-primary text-2xl">
                <CardHeader>
                    <CardTitle>
                        Atualizar produto
                    </CardTitle>
                    <CardDescription>
                        Atualize um produta já existente
                    </CardDescription>
                </CardHeader>
                <FormUpdateProduct id={id} />
            </Card>
        </main>
    )
}