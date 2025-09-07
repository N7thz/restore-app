import { FormUploadUserIcon } from "@/components/forms/form-upload-user-icon"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Stock App | Configurações",
}

export default function UploadPage() {
    return (
        <main className="h-container flex items-center justify-center p-8">
            <Card className="rounded-md w-2/3 justify-between border-primary">
                <CardHeader>
                    <CardTitle className="text-lg truncate">
                        Configurações
                    </CardTitle>
                    <CardDescription>
                        Altere as configurações padrões do sistema
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex size-full gap-2">
                    <FormUploadUserIcon />
                </CardContent>
                <CardFooter>
                    <Button
                        form="form-upload-file"
                        type="submit"
                    >
                        Fazer Upload
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}