"use client"

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error({
	error,
}: {
	error: Error & { digest?: string }
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	const { replace } = useRouter()

	return (
		<div className="relative flex h-container w-full items-center justify-center overflow-hidden bg-background p-20">
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
			<Card className={cn("z-50 w-1/2 bg-background", "max-sm:w-full")}>
				<CardHeader>
					<CardTitle>Error: {error.message}</CardTitle>
					<CardDescription>
						Se o error persistir procure o suporte
					</CardDescription>
				</CardHeader>
				<Separator />
				<CardContent className="overflow-hidden">
					<Image
						unoptimized
						loading="lazy"
						src={"/sonic.gif"}
						width={300}
						height={300}
						alt="sonic.gif"
						className="h-[200px] rounded-lg mx-auto"
					/>
				</CardContent>
				<Separator />
				<CardFooter className="justify-end">
					<Button
						className={cn("w-1/2", "max-sm:w-full")}
						onClick={() => replace("/home")}>
						Voltar a pagina inicial
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
