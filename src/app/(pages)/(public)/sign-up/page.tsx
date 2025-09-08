import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default async function SignUpPage() {
	return (
		<main className="h-container flex items-center justify-center p-8">
			<Card className={cn(
				"w-full justify-between border-primary",
				"lg:w-full",
				"xl:w-1/3",
				"lg:w-2/3"
			)}>
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">

				</CardContent>
			</Card>
		</main>
	)
}