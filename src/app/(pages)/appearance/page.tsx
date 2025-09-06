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

export default function UsersPage() {
    return (
        <main className="h-container flex items-center justify-center p-8">
            <Card className="rounded-md w-2/3 justify-between border-primary">
                <CardHeader>
                    <CardTitle className="text-lg truncate">

                    </CardTitle>
                    <CardDescription>

                    </CardDescription>
                    <CardAction>

                    </CardAction>
                </CardHeader>
                <CardContent className="flex size-full gap-2">
                    <Card className="size-full shadow-none">
                        <CardContent className="flex flex-col gap-2">

                        </CardContent>
                    </Card>
                </CardContent>
                <CardFooter>
                    <Button>
                        Confirmar
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}