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

export const columns: ColumnDef<ProductExit>[] = [
    select,
    actions,
    username,
    region,
    description,
    quantity,
    createdAt,
]