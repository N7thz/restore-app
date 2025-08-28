"use client"

import { findProducts } from "@/actions/find-products"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Ellipsis } from "lucide-react"
import { CardProductStok } from "./card-product-stok"

export const ProductsCard = () => {

    const {
        data: products,
        isLoading,
        status
    } = useQuery({
        queryKey: ["find-all-products"],
        queryFn: () => findProducts()
    })

    if (isLoading)
        return <div>Loading...</div>

    if (status === "error" || !products)
        return <div>Error loading products</div>

    return (
        <ScrollArea className="h-[500px] overflow-hidden">
            <ScrollBar />
            <CardContent className="grid grid-cols-3 gap-2 size-full space-y-2">
                {
                    products.map(product =>
                        <CardProductStok product={product} />
                    )
                }
            </CardContent>
        </ScrollArea>
    )
}
