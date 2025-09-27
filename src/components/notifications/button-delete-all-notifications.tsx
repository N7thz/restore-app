import { deleteAllNotification } from "@/actions/notifications/delete-all-notification"
import { queryClient } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { queryKey } from "@/lib/query-keys"
import { useMutation } from "@tanstack/react-query"
import { BellOff } from "lucide-react"
import { Notification } from "@prisma/client"
import { toast } from "../toast"
import { ComponentProps } from "react"

export const ButtonDeleteAllNotifications = (
	props: ComponentProps<typeof Button>
) => {
	const { mutate } = useMutation({
		mutationKey: queryKey.buttonDeleteAllNotifications(),
		mutationFn: () => deleteAllNotification(),
		onSuccess: () => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return []

					return oldData.filter(
						notification => notification.action === "MIN_QUANTITY"
					)
				}
			)
		},
		onError: err => {
			console.log(err)

			toast({
				title: "Não foi possivel excluir as notificações",
				description: `${err.message}`,
			})
		},
	})

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button onClick={() => mutate()} variant={"destructive"} {...props}>
					<BellOff className="group-hover:-translate-y-0.5 duration-200" />
				</Button>
			</TooltipTrigger>
			<TooltipContent className="bg-destructive">
				<p>Excluir notificações</p>
			</TooltipContent>
		</Tooltip>
	)
}
