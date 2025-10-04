import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { History } from "lucide-react"

export const NotificationCardError = ({ error, refetch }: {
	error: Error, refetch: () => void
}) => {
	return (
		<Card className="border-none">
			<CardHeader>
				<CardTitle>Não foi possível carregar as notificações</CardTitle>
				<CardDescription>
					{error.message}
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button
					variant="secondary"
					className="w-full"
					onClick={() => refetch()}>
					<History />
					Tentar novamente
				</Button>
			</CardFooter>
		</Card>
	)
}
