"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const SelectProductUpdate = ({
	name, quantity
}: { name: string, quantity: number }) => {
	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor="select-product">
				Selecione um produto:
			</Label>
			<Input
				readOnly
				value={`${name} (${quantity} unidades)`}
				className="text-muted-foreground"
			/>
		</div>
	)
}
