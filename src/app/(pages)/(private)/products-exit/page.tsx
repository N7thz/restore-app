import { DataTableProductsExit } from "@/client_pages/data-table-products-exit"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Saida de produtos | Stock App",
}

export default function ProductsExit() {
	return <DataTableProductsExit />
}
