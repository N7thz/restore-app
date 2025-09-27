import { findProductById } from "@/actions/products/find-product-by-id"
import { FormUpdateProduct } from "@/components/forms/form-update-product"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params

	const { name } = await findProductById(id)

	return {
		title: `${name} | Stoke App`,
	}
}

export default async function UpdateProduct({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<main className="h-container flex items-center justify-center p-8">
			<Card className="w-1/2 border-primary text-2xl">
				<CardHeader>
					<CardTitle>Atualizar produto</CardTitle>
					<CardDescription>Atualize um produta já existente</CardDescription>
				</CardHeader>
				<FormUpdateProduct id={id} />
			</Card>
		</main>
	)
}
