"use server"

import { Prisma } from "@prisma/client"
import { findProductsExitById } from "./find-products-exit-by-id"
import { prisma } from "@/lib/prisma"
import { updateProduct } from "../products/update-product"
import { createNotification } from "../notifications/create-notification"

export async function updateProductExit(
    id: string,
    formData: Prisma.ProductExitUpdateInput,
) {

    const oldProductExit = await findProductsExitById(id)

    console.log(formData)

    const { product } = await prisma.productExit.update({
        where: {
            id
        },
        data: formData,
        include: {
            product: true
        }
    })

    function calculateNewQuantity(): Prisma.FloatFieldUpdateOperationsInput | undefined {

        if (!formData.quantity || typeof formData.quantity !== "number") {
            return undefined
        }

        const newQuantity = oldProductExit.quantity - formData.quantity

        if (newQuantity < 0) {
            return {
                decrement: Math.abs(newQuantity)
            }
        }

        return {
            increment: newQuantity
        }
    }

    const quantity = calculateNewQuantity()

    console.log(quantity)

    await updateProduct(product.id, {
        quantity
    }, {
        includeNotifications: false
    })

    const notification = await createNotification({
        action: "UPDATE",
        name: product.name,
        description: `A saida do produto ${product.name} foi atualizada.`,
        createdAt: new Date()
    })

    return { notification }
}