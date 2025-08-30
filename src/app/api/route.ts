import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { products } from './products'

export async function GET() {
    return NextResponse.json(await prisma.product.createManyAndReturn({
        data: products
    }))
}