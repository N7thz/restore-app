"use client"

import { findManyUpdates } from "@/actions/updates/find-many-updates"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Ellipsis } from "lucide-react"

export const WhatsNewPage = () => {
	const { data, isPending, error } = authClient.useSession()

	const {
		data: updates,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["find-many-updates"],
		queryFn: () => findManyUpdates(),
	})

	if (isLoading || isPending || !data?.user) {
		return <div>Carregando...</div>
	}

	if (!updates || isError || error) {
		return <div>Error</div>
	}

	const role = data.user.role

	console.log(updates)

	return (
		<>
			{updates.map(({ id, title, description, content, createdAt }) => (
				<Card key={id} className="w-full">
					<CardHeader>
						<CardTitle>{title}</CardTitle>
						{description && <CardDescription>{description}</CardDescription>}
						<CardDescription>
							adicionado em:{" "}
							{formatDate(createdAt, "P", {
								locale: ptBR,
							})}
						</CardDescription>
						{role === "ADMIN" && (
							<CardAction>
								<Button variant={"outline"}>
									<Ellipsis />
								</Button>
							</CardAction>
						)}
					</CardHeader>
					<CardContent className="text-lg">{content}</CardContent>
				</Card>
			))}
		</>
	)
}
