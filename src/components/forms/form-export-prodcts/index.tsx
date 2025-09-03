"use client"

import { SpanErrorMessage } from "@/components/span-error"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ItemsLimitProps, productKeyOfs } from "@/types"
import { FormProvider } from "react-hook-form"
import { useFormExportProdcts } from "./use-form-export-prodcts"

export const FormExportProdcts = ({
    setOpen
}: { setOpen: (open: boolean) => void }) => {

    const {
        form,
        errors,
        ItemsLimit,
        handleSubmit,
        onSubmit,
        register,
        setValue,
    } = useFormExportProdcts({ setOpen })

    return (
        <FormProvider {...form}>
            <form
                id="form-export-prodcts"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-6">
                    <div className="flex gap-2 justify-between">
                        <div className="w-full flex flex-col gap-2.5">
                            <Label htmlFor="date-start">
                                Data de inicio:
                            </Label>
                            <Input
                                id="date-start"
                                type="date"
                                className={cn(errors.dateStart && "border border-destructive",)}
                                {...register("dateStart")}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2.5">
                            <Label htmlFor="date-end">
                                Data de término:
                            </Label>
                            <Input
                                id="date-end"
                                type="date"
                                className={cn(errors.dateEnd && "border border-destructive",)}
                                {...register("dateEnd")}
                            />
                        </div>
                    </div>
                    <div>
                        {
                            errors.dateStart &&
                            <SpanErrorMessage message={errors.dateStart.message} />
                        }
                        {
                            errors.dateEnd &&
                            <SpanErrorMessage message={errors.dateEnd.message} />
                        }
                    </div>
                    <Separator />
                    <div className="flex items-center justify-center -mt-2">
                        <h4 className="mx-auto">
                            Campos
                        </h4>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            {
                                productKeyOfs.map(({ key, label }) => (
                                    <div
                                        key={key}
                                        className="flex gap-2 items-center"
                                    >
                                        <Input type="checkbox"
                                            defaultChecked={true}
                                            className="size-5"
                                            {...register(key)}
                                        />
                                        <span className="text-sm capitalize">
                                            {label}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="block">
                            {
                                errors.id && <SpanErrorMessage message={errors.id.message} />
                            }
                        </div>
                    </div>
                    <Select onValueChange={(value) => {

                        if (value === "todos") return setValue("itemsLimit", "all")

                        return setValue("itemsLimit", value as ItemsLimitProps)
                    }}>
                        <SelectTrigger className={cn(
                            "w-full",
                            errors.itemsLimit && "border-destructive"
                        )}>
                            <SelectValue
                                className={cn(
                                    errors.itemsLimit && "placeholder:text-destructive"
                                )}
                                placeholder={
                                    errors.itemsLimit
                                        ? errors.itemsLimit.message
                                        : "Selecione a quantidade de itens"
                                } />

                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>
                                    Quantidade de itens
                                </SelectLabel>
                                {
                                    ItemsLimit.map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={pageSize}
                                            className="capitalize"
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </form>
        </FormProvider>
    )
}