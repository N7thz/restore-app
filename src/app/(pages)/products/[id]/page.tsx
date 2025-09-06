import { findProductById } from "@/actions/products/find-product-by-id"
import { ProductPage } from "@/client_pages/product-page"
import type { Metadata } from 'next'

export async function generateMetadata({
    params
}: { params: Promise<{ id: string }> }): Promise<Metadata> {

    const { id } = await params

    const { name } = await findProductById(id)

    return {
        title: `Stoke App | ${name}`
    }
}

export default async function Page({
    params
}: { params: Promise<{ id: string }> }) {

    const { id } = await params

    return (
        <main className="h-container flex items-center justify-center p-8">
            <ProductPage id={id} />
        </main>
    )
}