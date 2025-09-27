"use client"

import { findProductById } from "@/actions/products/find-product-by-id"
import { CardProductStokMenu } from "@/components/card-product-stok/card-product-stok-menu"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"
import { ActivityProductEntry } from "./activity-product-entry"
import { ActivityProductExit } from "./activity-product-exit"
import { ProductPageError } from "./product-page-error"
import { ProductPageLoading } from "./product-page-loading"
import { CardAccordionActivity } from "./card-accordion-activity"

export const ProductPage = ({ id }: { id: string }) => {
	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useQuery({
		queryKey: queryKey.findProductById(id),
		queryFn: () => findProductById(id),
	})

	if (isLoading) {
		return <ProductPageLoading />
	}

	if (error || !product) {
		return (
			<ProductPageError
				error={error}
				refetch={refetch}
			/>
		)
	}

	const {
		name,
		description,
		quantity,
		createdAt,
		imageUrl,
		minQuantity,
		productEntry,
		productExit,
	} = product

	const data = formatDate(createdAt, "PPP " as " HH:mm", { locale: ptBR })
	const isValidQuantity = quantity > minQuantity
	const Icon = isValidQuantity ? CheckCircle : XCircle

	const activityProducts = [...productEntry, ...productExit]

	activityProducts.sort((a, b) =>
		b.createdAt.getTime() - a.createdAt.getTime())

	return (
		<Card className="rounded-md justify-between border-primary">
			<CardHeader>
				<CardTitle className="text-2xl truncate">{name}</CardTitle>
				<CardDescription>criado em {data}</CardDescription>
				<CardAction>
					<CardProductStokMenu id={id} />
				</CardAction>
			</CardHeader>
			<CardContent className="flex size-full gap-4">
				<Image
					src={imageUrl}
					width={300}
					height={300}
					alt={`imagem ilustrativa do produto ${name}`}
					className="rounded-xl size-100"
				/>
				<Card className="h-full shadow-2xl">
					<ScrollArea className="h-88">
						<ScrollBar />
						<CardContent className="flex size-full flex-col gap-2 divide-y-2">
							{description && (
								<p className="mb-2">
									<span className="capitalize">
										descrição:
									</span>
									{description}
								</p>
							)}
							<p className="flex gap-2 items-center pb-2">
								<span className="capitalize font-extrabold">
									quantidade:
								</span>
								<span className="font-extralight">
									{quantity} unidades
								</span>
								<span className={cn(
									isValidQuantity ? "text-emerald-600" : "text-destructive"
								)}>
									<Icon className="size-4" />
								</span>
							</p>
							<p className="pb-2">
								<span className="capitalize font-extrabold mr-2">
									quantidade minima:
								</span>
								<span className="font-extralight">
									{minQuantity}
								</span>
							</p>
							<CardAccordionActivity
								name={name}
								activityProducts={activityProducts}
							/>
						</CardContent>
					</ScrollArea>
				</Card>
			</CardContent >
		</Card >
	)
}
