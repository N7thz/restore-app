import { FormSignUp } from "@/components/forms/form-signup"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default async function SignUpPage() {
	return (
		<main className="h-dvh flex items-center justify-center">
			<Card className={cn(
				"w-full justify-between border-primary",
				"lg:w-full",
				"xl:w-1/3",
				"lg:w-2/3"
			)}>
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Cadastre-se no sistema
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormSignUp />
				</CardContent>
			</Card>
		</main>
	)
}