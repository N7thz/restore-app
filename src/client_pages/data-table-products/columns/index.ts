"use client"

import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { actions } from "./action"
import { createdAt } from "./created-at"
import { description } from "./description"
import { minQuantity } from "./min-quntity"
import { name } from "./name"
import { price } from "./price"
import { quantity } from "./quantity"
import { select } from "./select"

export const columns: ColumnDef<Product>[] = [
	select,
	actions,
	name,
	description,
	price,
	quantity,
	minQuantity,
	createdAt,
]
