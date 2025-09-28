"use client"

import { cn } from "@/lib/utils"
import { DotPattern } from "./ui/dot-pattern"
import { LayoutProps } from "@/types"

export const DotPatternLinearGradient = ({ children }: LayoutProps) => {
    return (
        <div className="bg-background relative flex size-full items-center justify-center overflow-hidden rounded-lg border h-dvh">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
                )}
            />
            <div className="z-50 flex-1">
                {children}
            </div>
        </div>
    )
}
