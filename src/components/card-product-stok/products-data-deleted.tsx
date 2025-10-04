import { findProductById } from "@/actions/products/find-product-by-id"
import { 
    ActivityProductEntry 
} from "@/client_pages/product-page/activity-product-entry"
import { 
    ActivityProductExit 
} from "@/client_pages/product-page/activity-product-exit"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader 
} from "@/components/ui/card"
import { queryKey } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

export const ProductsDataDeleted = ({ id }: { id: string }) => {

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: queryKey.findProductById(id),
        queryFn: () => findProductById(id),
    })

    if (error || !product || isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardDescription>
                        Não foi possivel carregar os produtos
                    </CardDescription>
                    <span className="text-muted-foreground text-xs">
                        {error?.message}
                    </span>
                </CardHeader>
            </Card>
        )
    }

    const {
        name,
        productEntry,
        productExit,
    } = product

    const activityProducts = [...productEntry, ...productExit]

    activityProducts.sort((a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime())

    return (
        <Card className="bg-transparent border-none">
            <CardHeader>
                <CardDescription>
                    Dados que serão excluidos:
                </CardDescription>
            </CardHeader>
            <ScrollArea className="h-[200px] overflow-hidden">
                <ScrollBar />
                <CardContent className="space-y-4 px-2">
                    {activityProducts.length === 0
                        ? (
                            <p className="text-center text-muted-foreground">
                                Nenhuma atividade encontrada para este produto
                            </p>
                        ) : (
                            activityProducts.map(activityProduct => (
                                "price" in activityProduct
                                    ? (
                                        <ActivityProductEntry
                                            key={activityProduct.id}
                                            name={name}
                                            activityProduct={activityProduct}
                                            className="bg-transparent"
                                        />
                                    )
                                    : (
                                        <ActivityProductExit
                                            key={activityProduct.id}
                                            activityProduct={activityProduct}
                                            className="bg-transparent"
                                        />
                                    )
                            ))
                        )}
                </CardContent>
            </ScrollArea>
        </Card>
    )
}
