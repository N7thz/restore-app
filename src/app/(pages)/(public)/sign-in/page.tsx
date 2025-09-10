import { FormSign } from "@/components/forms/form-sign"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default async function SignInPage() {
	return (
		<main className="h-dvh flex items-center justify-center">
			<Card className={cn(
				"w-full justify-between border-primary",
				"lg:w-full",
				"xl:w-1/3",
				"lg:w-2/3"
			)}>
				<CardHeader>
					<CardTitle>
						Sign In
					</CardTitle>
					<CardDescription>
						Logue com o e-mail e senha
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormSign />
				</CardContent>
			</Card>
		</main>
	)
}
