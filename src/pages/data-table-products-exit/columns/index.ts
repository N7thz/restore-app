"use client"

import { ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { actions } from "./action"
import { createdAt } from "./created-at"
import { description } from "./description"
import { region } from "./region"
import { quantity } from "./quantity"
import { select } from "./select"
import { username } from "./username"
import { productId } from "./product"

export const columns: ColumnDef<ProductExit>[] = [
    select,
    actions,
    productId,
    username,
    region,
    description,
    quantity,
    createdAt,
]