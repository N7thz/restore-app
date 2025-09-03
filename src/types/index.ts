import { ColumnDefinition } from "@/lib/advanced-excel-export"

export type ResponseProducts<T> = Promise<{
    products: T[]
    count: number
}>

export const itemsLimit = ["10", "25", "30", "40", "50", "100", "all"] as const

export type ItemsLimitProps = "10" | "25" | "30" | "40" | "50" | "100" | "all"

export const productKeyOfs = [
    {
        key: "id",
        label: "id"
    },
    {
        key: "name",
        label: "nome"
    },
    {
        key: "description",
        label: "descrição"
    },
    {
        key: "price",
        label: "preço"
    },
    {
        key: "quantity",
        label: "quantidade"
    },
    {
        key: "minQuantity",
        label: "quantidade miníma"
    },
    {
        key: "createdAt",
        label: "data de criação"
    },
] as const

export const allColumns: ColumnDefinition[] = [
    {
        header: "Id",
        key: "id"
    },
    {
        header: "Nome",
        key: "name"
    },
    {
        header: "Descrição",
        key: "description"
    },
    {
        header: "Preço",
        key: "price"
    },
    {
        header: "Data",
        key: "createdAt"
    },
    {
        header: "Quantidade",
        key: "quantity"
    },
    {
        header: "Quantidade minima",
        key: "minQuantity"
    },
] as const