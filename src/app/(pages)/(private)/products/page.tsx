import { DataTableProducts } from "@/client_pages/data-table-products"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Produtos | Stock App",
}

export default function Products() {
  return <DataTableProducts />
}
