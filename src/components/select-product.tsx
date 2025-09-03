"use client"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { useFormContext } from "react-hook-form"
import { InputCreateProductProps } from "@/schemas/create-product-exit-schema"
import { findProducts } from "@/actions/products/find-products"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"

export const SelectProduct = ({ index }: { index: number }) => {

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.findAllProducts(),
        queryFn: () => findProducts()
    })

    const [searchValue, setSearchValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const {
        setValue,
        watch,
        formState: { errors }
    } = useFormContext<InputCreateProductProps>()

    const value = watch(`products.${index}.productId`)

    if (!data || isLoading) {
        return (
            <Button
                type="button"
                variant="outline"
                role="combobox"
                className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
                <span className="truncate text-muted-foreground">
                    Selecione um produto
                </span>
                <ChevronDownIcon className="text-muted-foreground/80 shrink-0 size-4" />
            </Button>
        )
    }

    const { products } = data

    function onSelect(value: string) {
        setValue(`products.${index}.productId`, value)
        setOpen(false)
    }

    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor="select-product">
                Selecione um produto:
            </Label>
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        id="select-product"
                        type="button"
                        variant="outline"
                        role="combobox"
                        className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                    >
                        <span className={cn("truncate", !value && "text-muted-foreground")}>
                            {
                                value
                                    ? products.find((product) => product.id === value)?.name
                                    : "Selecione um produto"
                            }
                        </span>
                        <ChevronDownIcon className="text-muted-foreground/80 shrink-0 size-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="border-input min-w-[var(--radix-popper-anchor-width)] p-0"
                >
                    <Command shouldFilter={false}>
                        <CommandInput
                            onValueChange={setSearchValue}
                            placeholder="Pesquise um produto..."
                        />
                        <CommandList>
                            <CommandEmpty>
                                Sem produtos encontrados.
                            </CommandEmpty>
                            <ScrollArea className="h-[220px] p-1.5">
                                <ScrollBar />
                                <CommandGroup>
                                    {
                                        products
                                            .filter(product =>
                                                product
                                                    .name
                                                    .toLowerCase()
                                                    .includes(
                                                        searchValue.toLowerCase()
                                                    )
                                            )
                                            .map((product) => (
                                                <CommandItem
                                                    key={product.id}
                                                    value={product.id}
                                                    onSelect={onSelect}
                                                >
                                                    <div>
                                                        {product.name}
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        ({product.quantity} unidaddes)
                                                    </div>
                                                    {value === product.id && (
                                                        <CheckIcon className="ml-auto size-4" />
                                                    )}
                                                </CommandItem>
                                            ))
                                    }
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}