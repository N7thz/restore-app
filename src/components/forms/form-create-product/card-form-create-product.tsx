import { Button } from "@/components/ui/button"
import {
	Card, CardAction, CardContent, CardHeader, CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InputProductProps } from "@/schemas/product-object-schema"
import { X } from "lucide-react"
import { FieldArrayWithId } from "react-hook-form"
import { ImageLabel } from "./image"
import { MinQuantityLabel } from "./min-quantity"
import { ProductLabel } from "./name"
import { PriceLabel } from "./price"
import { QuantityLabel } from "./quantity"

type CardFormCreateProductProps = {
	fields: FieldArrayWithId<InputProductProps>[]
	index: number
	remove: (index: number) => void
}

export const CardFormCreateProduct = ({
	fields,
	index,
	remove,
}: CardFormCreateProductProps) => {
	return (
		<Card>
			<CardHeader>
				<CardAction>
					<Button
						type="button"
						variant={"outline"}
						disabled={fields.length === 1}
						onClick={() => remove(index)}>
						<X />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-3">
				<ProductLabel index={index} />
				<MinQuantityLabel index={index} />
				<ImageLabel index={index} />
				<Separator />
				<CardHeader>
					<CardTitle className="text-base text-muted-foreground mx-auto">
						Entrada de produto
					</CardTitle>
				</CardHeader>
				<PriceLabel index={index} />
				<QuantityLabel index={index} />
			</CardContent>
		</Card>
	)
}
