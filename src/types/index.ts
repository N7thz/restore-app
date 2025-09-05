import { ColumnDefinition } from "@/lib/advanced-excel-export"
import { Product } from "@prisma/client";

export type ResponseProducts<T> = Promise<{
    products: T[]
    count: number
}>

export type ProductExitWithProduct = {
    id: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    region: string;
    username: string;
    productId: string;
    product: Product
}

export const itemsLimit = ["10", "25", "30", "40", "50", "100", "all"] as const

export type ItemsLimitProps = "10" | "25" | "30" | "40" | "50" | "100" | "all"