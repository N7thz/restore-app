"use client"

import { findProducts } from "@/actions/products/find-products"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
} from "@/components/ui/card"
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { queryKey } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import { InputCreateProductEntryProps } from "@/schemas/create-product-entry"
import { useQuery } from "@tanstack/react-query"
import { CheckIcon, ChevronDownIcon, RotateCcw } from "lucide-react"
import { ComponentProps, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

export const SelectProduct = (props: ComponentProps<typeof Popover>) => {
	const [searchValue, setSearchValue] = useState<string>("")
	const [open, setOpen] = useState<boolean>(false)

	const {
		data: products,
		isLoading,
		status,
		refetch,
	} = useQuery({
		queryKey: queryKey.findAllProducts(),
		queryFn: () => findProducts(),
	})

	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<InputCreateProductEntryProps>()

	useEffect(() => {
		if (errors.productId) {
			console.log(errors.productId)
			setOpen(true)
		}
	}, [errors])

	const value = watch("productId")

	if (isLoading) {
		return (
			<Button
				type="button"
				variant="outline"
				role="combobox"
				className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]">
				<span className="truncate text-muted-foreground">
					Selecione um produto
				</span>
				<ChevronDownIcon className="text-muted-foreground/80 shrink-0 size-4" />
			</Button>
		)
	}

	if (status === "error" || !products) {
		return (
			<Card className="bg-secondary">
				<CardHeader>
					<CardDescription>
						Não foi possivel carregar os produtos.Clique para tentar novamente
					</CardDescription>
					<CardAction>
						<Button onClick={() => refetch()}>
							<RotateCcw className="group-hover:-rotate-360 transition-all" />
						</Button>
					</CardAction>
				</CardHeader>
			</Card>
		)
	}

	function onSelect(value: string) {
		setValue("productId", value)
		setOpen(false)
	}

	const productsFilterd = products.filter(({ name }) =>
		name?.toLowerCase().includes(searchValue.toLowerCase())
	)

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor="select-product" className="mb-2">
				Selecione um produto:
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id="select-product"
						type="button"
						variant="outline"
						role="combobox"
						className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]">
						<span className={cn("truncate", !value && "text-muted-foreground")}>
							{value
								? products.find(product => product.id === value)?.name
								: "Selecione um produto"}
						</span>
						<ChevronDownIcon className="text-muted-foreground/80 shrink-0 size-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="start"
					className="border-input min-w-[var(--radix-popper-anchor-width)] p-0">
					<Command shouldFilter={false}>
						<CommandInput
							onValueChange={setSearchValue}
							placeholder={
								errors.productId
									? errors.productId.message
									: "Pesquise um produto..."
							}
							className={cn(errors.productId && "placeholder:text-destructive")}
						/>
						<CommandList>
							<CommandEmpty>Sem produtos encontrados.</CommandEmpty>
							<ScrollArea className="h-[220px] p-1.5">
								<ScrollBar />
								<CommandGroup>
									{productsFilterd.map(product => (
										<CommandItem
											key={product.id}
											value={product.id}
											onSelect={onSelect}>
											<div>{product.name}</div>
											<div className="text-muted-foreground">
												({product.quantity} unidaddes)
											</div>
											{value === product.id && (
												<CheckIcon className="ml-auto size-4" />
											)}
										</CommandItem>
									))}
								</CommandGroup>
							</ScrollArea>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
