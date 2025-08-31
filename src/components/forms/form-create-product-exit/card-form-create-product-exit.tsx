import { DatePicker } from "@/components/date-picker"
import { SelectProduct } from "@/components/select-product"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardHeader
} from "@/components/ui/card"
import { X } from "lucide-react"
import { DescriptionLabel } from "./description"
import { QuantityLabel } from "./quantity"
import { RegionLabel } from "./region"
import { UsernameLabel } from "./user-name"

type CardFormCreateProductProps = {
    fields: unknown[]
    index: number
    remove: (index: number) => void
    isLoading: boolean,
    isSuccess: boolean
}

export const CardFormCreateProductExit = ({
    fields, index, isLoading, isSuccess, remove
}: CardFormCreateProductProps) => {
    return (
        <Card>
            <CardHeader>
                <CardAction>
                    <Button
                        type="button"
                        variant={"outline"}
                        disabled={fields.length === 1 || (isLoading || isSuccess)}
                        onClick={() => remove(index)}
                        className="hover:bg-red-500 hover:text-foreground"
                    >
                        <X />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-5">
                <DatePicker index={index} />
                <UsernameLabel index={index} />
                <QuantityLabel index={index} />
                <RegionLabel index={index} />
                <SelectProduct index={index} />
                <DescriptionLabel index={index} />
            </CardContent>
        </Card>
    )
}

