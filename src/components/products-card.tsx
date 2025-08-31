"use client"

import { findProducts } from "@/actions/products/find-products"
import { CardProductStok } from "@/components/card-product-stok"
import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardDescription,
    CardFooter
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { queryKeys } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { Ellipsis } from "lucide-react"
import Link from "next/link"

export const ProductsCard = () => {

    const {
        data,
        isLoading,
        status
    } = useQuery({
        queryKey: queryKeys.findAllProducts(),
        queryFn: () => findProducts({ take: 12 })
    })

    if (isLoading) return <div>Loading...</div>

    if (status === "error" || !data)
        return <div>Error loading products</div>

    const { products, count } = data

    return (
        <ScrollArea className="h-[500px] overflow-hidden">
            <ScrollBar />
            <CardContent className={cn(
                "grid grid-cols-3 gap-2 size-full space-y-2",
                products.length === 0 && "grid-cols-1"
            )}>
                {
                    products.length === 0 && (
                        <CardFooter className="w-full">
                            <CardDescription className="text-2xl mx-auto italic">
                                Sem produtos cadastrados
                            </CardDescription>
                        </CardFooter>
                    )
                }
                {
                    products.map(product =>
                        <CardProductStok
                            key={product.id}
                            product={product}
                        />
                    )
                }
            </CardContent>
            {
                count > 12 && (
                    <div className="w-full flex justify-center ">
                        <Button
                            asChild
                            variant={"link"}
                            className="text-base"
                        >
                            <Link href={"/products"}>
                                <Ellipsis className="size-5" />
                                Ver todas as saidas
                            </Link>
                        </Button>
                    </div>
                )
            }
        </ScrollArea>
    )
}
