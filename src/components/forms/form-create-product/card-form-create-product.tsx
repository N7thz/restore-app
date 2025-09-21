import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { X } from "lucide-react"
import { ImageLabel } from "./image"
import { MinQuantityLabel } from "./min-quantity"
import { ProductLabel } from "./name"
import { PriceLabel } from "./price"
import { QuantityLabel } from "./quantity"

type CardFormCreateProductProps = {
  fields: unknown[]
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
            onClick={() => remove(index)}
          >
            <X />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <ProductLabel index={index}/>
        <PriceLabel index={index}/>
        <QuantityLabel index={index}/>
        <MinQuantityLabel index={index}/>
        <ImageLabel index={index}/>
      </CardContent>
    </Card>
  )
}
