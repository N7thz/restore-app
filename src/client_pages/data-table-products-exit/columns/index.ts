"use client"

import { Product, ProductExit } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { actions } from "./action"
import { createdAt } from "./created-at"
import { description } from "./description"
import { region } from "./region"
import { quantity } from "./quantity"
import { select } from "./select"
import { name } from "./name"
import { productId } from "./product"

export const columns: ColumnDef<ProductExit & { product: Product }>[] = [
	select,
	actions,
	productId,
	name,
	region,
	description,
	quantity,
	createdAt,
]
