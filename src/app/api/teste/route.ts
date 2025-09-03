import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

type Type = keyof Product

function arrayToObjet(array: any[]) {

    const omit: { [key: string]: boolean } = {}

    for (let item of array) {
        omit[item] = true
    }

    return omit
}

export async function GET() {

    const products: Type[] = ["createdAt", "id"]

    const omit = arrayToObjet(products)

    const filteredProducts = await prisma.product.findMany({
        omit,
        take: undefined
    })

    return NextResponse.json({ count: filteredProducts.length, filteredProducts })
}