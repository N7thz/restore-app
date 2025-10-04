"use client"

import { findProductsCount } from "@/actions/products/find-all-products-count"
import { findProducts } from "@/actions/products/find-products"
import { CardProductStok } from "@/components/card-product-stok"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { Ellipsis, RotateCcw, XCircle } from "lucide-react"
import Link from "next/link"
import { Animation } from "./animation"
import { Skeleton } from "./ui/skeleton"

export const ProductsCard = () => {
	const {
		data: products,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: queryKey.findAllProducts(),
		queryFn: () => findProducts({ take: 12 }),
	})

	const { data: count } = useQuery({
		queryKey: ["find-all-products-count"],
		queryFn: () => findProductsCount(),
	})

	if (isLoading) {
		return (
			<CardContent
				className={cn(
					"grid grid-cols-3 gap-2 size-full space-y-2 overflow-hidden",
					"max-sm:grid-cols-1"
				)}>
				{Array.from({ length: 12 }).map((_, index) => (
					<Skeleton
						key={index}
						className={cn(
							"w-full h-[200px]",
							index > 2 && index < 6 && "opacity-60",
							index >= 6 && "opacity-20"
						)}
					/>
				))}
			</CardContent>
		)
	}

	if (error || !products) {
		return (
			<Card className="flex h-full flex-col justify-between mx-12 overflow-hidden">
				<CardHeader>
					<CardTitle className="text-destructive flex items-center gap-2">
						<XCircle className="text-destructive" />
						Error buscando produtos
					</CardTitle>
					<CardDescription>
						{error?.message}
					</CardDescription>
					<CardAction>
						<Button
							variant={"secondary"}
							className="w-full"
							onClick={() => refetch()}>
							<RotateCcw className="group-hover:-rotate-360 transition-all" />
							Tentar novamente
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent className="grid grid-cols-3 gap-2 size-full space-y-2">
					{Array.from({ length: 5 }).map((_, index) => (
						<Skeleton key={index} className="w-full h-[220px]" />
					))}
				</CardContent>
			</Card>
		)
	}

	return (
		<ScrollArea className="h-[500px] overflow-hidden">
			<ScrollBar />
			<CardContent
				className={cn(
					"grid grid-cols-3 gap-2 size-full space-y-2",
					"max-sm:grid-cols-1 max-sm:whitespace-nowrap",
					count === 0 && "grid-cols-1"
				)}>
				{count === 0 && (
					<CardFooter className="w-full">
						<CardDescription className="text-2xl mx-auto italic">
							Sem produtos cadastrados
						</CardDescription>
					</CardFooter>
				)}
				{products.map((product, i) => (
					<Animation
						key={product.id}
						initial={{ opacity: 0, scale: 0, }}
						animate={{ opacity: 1, scale: 1, }}
						exit={{ opacity: 0, scale: 0, }}
						transition={{ duration: 0.5, delay: i * 0.1, }}
					>
						<CardProductStok key={product.id} product={product} />
					</Animation>
				))}
			</CardContent>
			{typeof count === "number" && count > 12 && (
				<div className="w-full flex justify-center ">
					<Button asChild variant={"link"} className="text-base">
						<Link href={"/products"}>
							<Ellipsis className="size-5" />
							Ver todas as saidas
						</Link>
					</Button>
				</div>
			)}
		</ScrollArea>
	)
}
