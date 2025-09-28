import { WhatsNewPage } from "@/client_pages/whats-new-page"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Novidades | Stock App",
}

export default function WhatsNew() {
	return (
		<main className="h-container flex items-center justify-center p-8">
			<Card
				className={cn(
					"w-full justify-between border-primary",
					"lg:w-full",
					"xl:w-2/3",
					"lg:w-2/3"
				)}>
				<CardHeader>
					<CardTitle>Atualizações e novidades</CardTitle>
					<CardDescription>Fique por dentro do que a de novo</CardDescription>
				</CardHeader>
				<ScrollArea className="h-[500px] overflow-hidden">
					<ScrollBar />
					<CardContent className="size-full space-y-4">
						<WhatsNewPage />
					</CardContent>
				</ScrollArea>
			</Card>
		</main>
	)
}
