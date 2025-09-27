"use client"

import { findProductsExitById } from "@/actions/products-exit/find-products-exit-by-id"
import { CardProductExitStokMenu } from "@/components/card-product-stok/card-product-exit-stok-menu"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { queryKey } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Ellipsis } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const ProductPageExit = ({ id }: { id: string }) => {
	const {
		data: productExit,
		isLoading,
		status,
	} = useQuery({
		queryKey: queryKey.findProductExitById(id),
		queryFn: () => findProductsExitById(id),
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

	if (status === "error" || !productExit) {
		return <div>Error</div>
	}

	const { name, description, quantity, createdAt, region, product } =
		productExit

	const data = formatDate(createdAt, "PPP " as " HH:mm", { locale: ptBR })

	return (
		<Card className="rounded-md w-2/3 justify-between border-primary">
			<CardHeader>
				<CardTitle className="text-lg truncate">{product.name}</CardTitle>
				<CardDescription>criado em {data}</CardDescription>
				<CardAction>
					<CardProductExitStokMenu id={id} />
				</CardAction>
			</CardHeader>
			<CardContent className="flex size-full gap-2">
				{product.imageUrl && (
					<div className="overflow-hidden size-fit rounded-xl border shadow-2xl">
						<Image
							src={product.imageUrl}
							width={300}
							height={300}
							alt={`imagem ilustrativa do produto${product.name}`}
							className="size-full"
						/>
					</div>
				)}
				<Card className="size-full shadow-none">
					<CardContent className="flex flex-col gap-3.5 divide-y-2">
						{description && (
							<p className="mb-2">
								<span className="capitalize font-semibold">descrição:</span>
								{description}
							</p>
						)}
						<p className="pb-2">
							<span className="capitalize font-semibold mr-2">quantidade:</span>
							{quantity} unidades
						</p>
						<p className="flex gap-2 items-center pb-2">
							<span className="capitalize font-semibold">quantidade:</span>
							{quantity}
						</p>
						<p className="flex gap-2 items-center pb-2">
							<span className="font-semibold capitalize">entrege a:</span>
							{name}
						</p>
						<p className="flex gap-2 items-center pb-2">
							<span className="font-semibold capitalize">Região:</span>
							{region}
						</p>
						<Button asChild>
							<Link href={`/products/${product.id}`}>Ir para produto:</Link>
						</Button>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	)
}
