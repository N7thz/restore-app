import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { ActivityProductEntry } from "./activity-product-entry"
import { ActivityProductExit } from "./activity-product-exit"
import { ProductEntry, ProductExit } from "@prisma/client"

export const CardAccordionActivity = ({
    activityProducts, name
}: { activityProducts: (ProductExit | ProductEntry)[], name: string }) => {
    return (
        <Card className="p-0">
            <Accordion
                type="single"
                collapsible
                className="contents"
            >
                <AccordionItem
                    value="item-01"
                    className="w-150"
                >
                    <AccordionTrigger className="px-6 text-lg">
                        Atividade:
                    </AccordionTrigger>
                    <AccordionContent asChild>
                        <CardContent className="space-y-4 px-2">
                            {activityProducts.length === 0
                                ? (
                                    <p className="text-center text-muted-foreground">
                                        Nenhuma atividade encontrada para este produto
                                    </p>
                                ) : (
                                    activityProducts.map(activityProduct => (
                                        "price" in activityProduct
                                            ? (
                                                <ActivityProductEntry
                                                    key={activityProduct.id}
                                                    name={name}
                                                    activityProduct={activityProduct}
                                                />
                                            )
                                            : (
                                                <ActivityProductExit
                                                    key={activityProduct.id}
                                                    activityProduct={activityProduct}
                                                />
                                            )
                                    ))
                                )}
                        </CardContent>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
