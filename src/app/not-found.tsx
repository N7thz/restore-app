"use client"

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function NotFound() {
  
  const { back } = useRouter()

  return (
    <div className={cn("relative flex h-container w-full items-center justify-center overflow-hidden bg-background p-8", "max-sm:p-2")}>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={1}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <Card className={cn(
        "z-50 w-1/2 bg-background",
        "max-sm:w-full"
      )}>
        <CardHeader>
          <CardTitle>A pagina não foi encontrada :/</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <Image
            src={"/ui-dark.png"}
            width={300}
            height={300}
            alt="sonic.gif"
            className="h-[200px] rounded-lg mx-auto"
            onError={(err) => console.log(err)}
          />
        </CardContent>
        <Separator />
        <CardFooter className="justify-end">
          <Button className={cn("w-1/2", "max-sm:w-full")} onClick={back}>
            Voltar a pagina inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
