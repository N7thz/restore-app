"use client"

import { findProductById } from "@/actions/products/find-product-by-id"
import { CardProductStokMenu } from "@/components/card-product-stok/card-product-stok-menu"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CheckCircle, Ellipsis, XCircle } from "lucide-react"
import Image from "next/image"

export const ProductPage = ({ id }: { id: string }) => {

    const { data: product, isLoading, status } = useQuery({
        queryKey: queryKey.findProductById(id),
        queryFn: () => findProductById(id)
    })

    if (isLoading) {
        return (
            <Card className="rounded-md w-2/3 justify-between border-primary">
                <CardHeader>
                    <CardTitle className="text-lg truncate">
                        <Skeleton className="w-2/3" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="w-56 h-4" />
                    </CardDescription>
                    <CardAction>
                        <Ellipsis />
                    </CardAction>
                </CardHeader>
                <CardContent className="flex size-full gap-2">
                    <Card className="size-full shadow-none">
                        <CardContent className="flex flex-col gap-2">
                            <Skeleton className="w-full" />
                            <Skeleton className="w-3/5" />
                            <Skeleton className="w-1/4" />
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        )
    }

    if (status === "error" || !product) {
        return (
            <div>
                Error
            </div>
        )
    }

    const {
        name,
        description,
        quantity,
        createdAt,
        imageUrl,
        price,
        minQuantity,
    } = product

    const data = formatDate(createdAt, "PPP " as " HH:mm", { locale: ptBR })

    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price)

    const isValidQuantity = quantity > minQuantity
    const Icon = isValidQuantity ? CheckCircle : XCircle

    return (
        <Card className="rounded-md w-2/3 justify-between border-primary">
            <CardHeader>
                <CardTitle className="text-lg truncate">
                    {name}
                </CardTitle>
                <CardDescription>
                    criado em {data}
                </CardDescription>
                <CardAction>
                    <CardProductStokMenu id={id} />
                </CardAction>
            </CardHeader>
            <CardContent className="flex size-full gap-2">
                {
                    imageUrl &&
                    <div className="overflow-hidden size-fit rounded-xl border shadow-2xl">
                        <Image
                            src={imageUrl}
                            quality={100}
                            width={300}
                            height={300}
                            alt={`imagem ilustrativa do produto${name}`}
                            className="size-full"
                        />
                    </div>
                }
                <Card className="size-full shadow-none">
                    <CardContent className="flex flex-col gap-2 divide-y-2">
                        {
                            description &&
                            <p className="mb-2">
                                <span className="capitalize">
                                    descrição:
                                </span>
                                {description}
                            </p>
                        }
                        <p className="pb-2">
                            <span className="capitalize font-semibold mr-2">
                                quantidade:
                            </span>
                            {quantity} unidades
                        </p>
                        <p className="pb-2">
                            <span className="capitalize font-semibold mr-2">
                                preço:
                            </span>
                            {formatted}
                        </p>
                        <p className="flex gap-2 items-center pb-2">
                            <span className="capitalize font-semibold">
                                quantidade:
                            </span>
                            {quantity}
                            <span className={cn(
                                isValidQuantity ? "text-emerald-600" : "text-destructive"
                            )}>
                                <Icon className="size-4" />
                            </span>
                        </p>
                        <p className="pb-2">
                            <span className="capitalize font-semibold mr-2">
                                quantidade minima:
                            </span>
                            {minQuantity}
                        </p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
