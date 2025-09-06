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
import { cn } from "@/lib/utils"

type CardFormCreateProductProps = {
    fields: unknown[]
    index: number
    isLoading: boolean
    isSuccess: boolean
    remove: (index: number) => void
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
                        className={cn([
                            "duration-200",
                            "hover:scale-95",
                            "dark:hover:bg-red-500 dark:hover:text-foreground"
                        ])}
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

