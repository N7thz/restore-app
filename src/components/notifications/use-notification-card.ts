import { Action, Notification } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CheckCircle, CircleAlert, TriangleAlert, XCircle } from "lucide-react"
import { NotificationCardProps } from "./notification-card"
import { useMutation } from "@tanstack/react-query"
import { deleteNotificationById } from "@/actions/notifications/delete-notification-by-id"
import { readNotificationById } from "@/actions/notifications/read-notification-by-id"
import { queryClient } from "../theme-provider"
import { queryKey } from "@/lib/query-keys"

export function useNotificationCard({
	notification: { id, createdAt, action },
}: NotificationCardProps) {
	const date = formatDate(createdAt, "dd 'de' MMMM 'de' yyyy 'as' HH:mm", {
		locale: ptBR,
	})

	const useAction = (action: Action) => {
		if (action === "CREATE") {
			return CheckCircle
		} else if (action === "UPDATE") {
			return CircleAlert
		} else if (action === "DELETE") {
			return XCircle
		}

		return TriangleAlert
	}

	const Icon = useAction(action)

	const { mutate: deleteNotificationMutate } = useMutation({
		mutationKey: queryKey.deleteNotificationById(),
		mutationFn: () => deleteNotificationById(id),
		onSuccess: notification => {
			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return [notification]

					return oldData.filter(({ id }) => id !== notification.id)
				}
			)
		},
	})

	const { mutate: readNotificationMutate } = useMutation({
		mutationKey: ["read-notification-by-id"],
		mutationFn: () => readNotificationById(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey.findAllNotifications(),
			})
		},
	})

	function deleteNotification() {
		deleteNotificationMutate()
	}

	function readNotification() {
		readNotificationMutate()
	}

	return {
		Icon,
		date,
		deleteNotification,
		readNotification,
	}
}
