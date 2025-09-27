import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const ProductPageError = ({
    error, refetch
}: { error: Error | null, refetch: () => void }) => {
    return (
        <Card className="rounded-md w-2/3 justify-between border-primary">
            <CardHeader>
                <CardTitle className="text-lg">
                    Produto não encontrado
                </CardTitle>
                {
                    typeof error?.cause === "string" && (
                        <CardDescription>
                            {error.cause}
                        </CardDescription>
                    )
                }
            </CardHeader>
            <CardContent className="flex size-full gap-2">
                <Skeleton className="w-1/3 h-72" />
                <Card className="w-2/3 h-72 shadow-none justify-between">
                    <CardHeader>
                        <CardDescription>
                            {error?.name}
                        </CardDescription>
                        <CardTitle className="text-lg">
                            {error?.message}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="justify-end">
                        <Button
                            variant="default"
                            onClick={() => refetch()}
                        >
                            Tentar novamente
                        </Button>
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
    )
}
