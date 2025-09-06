import { ColumnDefinition } from "@/lib/advanced-excel-export"

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

export const allColumnsProductExit: ColumnDefinition[] = [
    {
        header: "Entrege a",
        key: "username"
    },
    ...allColumns
] as const