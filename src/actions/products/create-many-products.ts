"use server"

import { prisma } from "@/lib/prisma"
import { Notification, Prisma, Product } from "@prisma/client"
import { createNotification } from "../notifications/create-notification"

export type CreateManyProductsProps = {
	products: (
		Prisma.ProductCreateInput & {
			productEntry: Prisma.ProductEntryCreateManyInput
		}
	)[]
}

export async function createManyProducts({
	products
}: CreateManyProductsProps) {

	const productsCreated: Product[] = []

	for (const {
		productEntry: {
			price,
			quantity
		},
		...rest
	} of products) {

		const productCreated = await prisma.product.create({
			data: {
				...rest,
				productEntry: {
					create: {
						price,
						quantity
					}
				}
			}
		})

		productsCreated.push(productCreated)
	}

	const notifications: Notification[] = []

	for (const product of productsCreated) {

		const { name, createdAt } = product

		const notification = await createNotification({
			name: name.toLowerCase(),
			description: `O produto ${name} foi criado com sucesso.`,
			action: "CREATE",
			createdAt,
		})

		notifications.push(notification)
	}

	return { notifications }
}
