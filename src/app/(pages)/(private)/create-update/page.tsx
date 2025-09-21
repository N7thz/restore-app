import { FormCreateUpdate } from "@/components/forms/form-create-update"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Criar novidades | Stock App",
}

export default async function CreateUpdate() {
    return (
        <main className="h-container flex items-center justify-center px-8 py-4">
            <Card className={cn(
                "w-1/2 border-primary",
                "max-sm:w-full",
                "max-md:w-10/12 md:w-4/5",
                "xl:w-2/5"
            )}>
                <CardHeader>
                    <CardTitle>
                        Cadastrar novidade
                    </CardTitle>
                    <CardDescription>
                        Adicione uma novidade ao projeto
                    </CardDescription>
                </CardHeader>
                <FormCreateUpdate />
            </Card>
        </main>
    )
}