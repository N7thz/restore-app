import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { faker } from "@faker-js/faker"
import { Product } from "@prisma/client"

const generateProduct = () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    imageUrl: faker.image.url(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    createdAt: faker.date.past(),
    quantity: faker.number.int({ min: 0, max: 200 }),
    minQuantity: faker.number.float({ min: 0, max: 30 })
})

export async function GET() {

    const products: Product[] = []

    Array
        .from({ length: 116 })
        .map(async () => {

            const data = generateProduct()

            const product = await prisma.product.create({
                data
            })

            products.push(product)
        })

    return NextResponse.json(products)
}