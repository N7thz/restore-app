import { findProductsExitById } from "@/actions/products-exit/find-products-exit-by-id"
import { ProductPageExit } from "@/client_pages/product-exit-page"
import type { Metadata } from 'next'

export async function generateMetadata({
    params
}: { params: Promise<{ id: string }> }): Promise<Metadata> {

    const { id } = await params

    const { product: { name } } = await findProductsExitById(id)

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
            <ProductPageExit id={id} />
        </main>
    )
}