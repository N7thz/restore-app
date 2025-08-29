"use client"

import { findProducts } from "@/actions/find-products"
import { CardProductStok } from "@/components/card-product-stok"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { Ellipsis } from "lucide-react"
import Link from "next/link"

export const ProductsCard = () => {

    const {
        data,
        isLoading,
        status
    } = useQuery({
        queryKey: ["find-all-products"],
        queryFn: () => findProducts()
    })

    if (isLoading) return <div>Loading...</div>

    if (status === "error" || !data)
        return <div>Error loading products</div>

    const { products, count } = data

    return (
        <ScrollArea className="h-[500px] overflow-hidden">
            <ScrollBar />
            <CardContent className="grid grid-cols-3 gap-2 size-full space-y-2">
                {
                    products.map(({ id, ...product }) =>
                        <CardProductStok
                            key={id}
                            product={{ id, ...product }}
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
                            <Link href={"/products-exit"}>
                                <Ellipsis className="size-5"/>
                                Ver todas as saidas
                            </Link>
                        </Button>
                    </div>
                )
            }
        </ScrollArea>
    )
}
