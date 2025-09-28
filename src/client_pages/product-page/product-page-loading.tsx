import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Ellipsis } from "lucide-react"

export const ProductPageLoading = () => {
	return (
		<Card className="rounded-md justify-between border-primary">
			<CardHeader>
				<CardTitle className="text-lg truncate">
					<Skeleton className="w-2/3" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="w-56 h-4 opacity-40" />
				</CardDescription>
				<CardAction>
					<Ellipsis />
				</CardAction>
			</CardHeader>
			<CardContent className="flex size-full gap-2">
				<Skeleton className="size-88" />
				<Card className="w-2/3 h-88 shadow-none">
					<CardContent className="flex flex-col gap-2">
						<Skeleton className="w-150" />
						<Skeleton className="w-3/5 opacity-45" />
						<Skeleton className="w-1/4 opacity-20" />
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	)
}
