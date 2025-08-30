"use client"

import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"
import { ComponentProps } from "react"
import { Button, Group, Input, NumberField } from "react-aria-components"

type InputNumberProps = ComponentProps<typeof Input> & {
  step?: number
}

export function InputNumber({
  className, step = 1, ...props
}: InputNumberProps) {

  return (
    <NumberField
      step={step}
      defaultValue={1}
      minValue={1}
      maxValue={9999}
      className={"w-full"}
    >
      <div className="*:not-first:mt-2">
        <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
          <Button
            slot="decrement"
            className="border-input text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MinusIcon className="size-4" />
          </Button>
          <Input
            className={cn(
              "text-foreground w-full grow px-3 py-2 text-center tabular-nums",
              className
            )}
            {...props}
          />
          <Button
            slot="increment"
            className="border-input text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
          </Button>
        </Group>
      </div>
    </NumberField>
  )
}
