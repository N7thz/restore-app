"use client"

import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import z from "zod"

const formUpdateUserSchema = z
	.object({
		name: z.string().toLowerCase(),
		newPassword: z
			.string()
			.min(1, "A nova senha deve ter no minimo 6 caracteres"),
		currentPassword: z
			.string()
			.min(6, "A senha atual deve ter no minimo 6 caracteres"),
	})
	.refine(
		({ currentPassword, newPassword }) => currentPassword !== newPassword,
		{
			error: "As senhas devem ser diferentes.",
			path: ["newPassword"],
		}
	)

type FormUpdateUserProps = z.infer<typeof formUpdateUserSchema>

export const FormUpdateUser = () => {
	const { replace } = useRouter()

	const session = authClient.useSession()

	const [visible, setVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<FormUpdateUserProps>({
		resolver: zodResolver(formUpdateUserSchema),
		defaultValues: {
			name: session.data?.user.name,
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = form

	async function onSubmit({
		name,
		currentPassword,
		newPassword,
	}: FormUpdateUserProps) {
		setIsLoading(true)

		const { data, error } = await authClient.updateUser({ name })

		if (data) {
			await authClient.changePassword({
				revokeOtherSessions: true,
				currentPassword,
				newPassword,
				fetchOptions: {
					onSuccess: () => {
						setIsLoading(false)

						toast({
							title: "Os dados foram atualizados com sucesso.",
							onAutoClose: async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => replace("/sign-in"),
									},
								})
							},
						})
					},
					onError: ({ error }) => {
						toast({
							title: error.cause as string,
							description: error.message,
							onAutoClose: () => setIsLoading(false),
							variant: "error",
						})
					},
				},
			})
		}

		if (error && error.code && error.message) {
			toast({
				title: error.message,
				description: error.statusText,
				onAutoClose: () => setIsLoading(false),
				variant: "error",
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className="size-full">
					<CardHeader>
						<CardTitle className="text-lg">Editar informações</CardTitle>
						<CardDescription>Editar informações pessoais</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Input
								defaultValue={session.data?.user.name}
								placeholder="Nome do usuário"
								{...register("name")}
								className={cn(
									errors.name && [
										"focus-visible:ring-destructive",
										"not-focus-visible:border-destructive",
									]
								)}
							/>
							{errors.name && (
								<SpanErrorMessage message={errors.name.message} />
							)}
						</div>
						<div className="space-y-2">
							<Input
								type={visible ? "text" : "password"}
								placeholder="Senha atual"
								{...register("currentPassword")}
								className={cn(
									errors.currentPassword && [
										"focus-visible:ring-destructive",
										"not-focus-visible:border-destructive",
									]
								)}
							/>
							{errors.currentPassword && (
								<SpanErrorMessage message={errors.currentPassword.message} />
							)}
						</div>
						<div className="space-y-2">
							<Input
								type={visible ? "text" : "password"}
								placeholder="Nova senha"
								{...register("newPassword")}
								className={cn(
									errors.newPassword && [
										"focus-visible:ring-destructive",
										"not-focus-visible:border-destructive",
									]
								)}
							/>
							{errors.newPassword && (
								<SpanErrorMessage message={errors.newPassword.message} />
							)}
							<Button
								type="button"
								variant={"link"}
								className="p-0"
								onClick={() => setVisible(visible => !visible)}>
								{visible ? "esconder senha" : "mostrar senha"}
							</Button>
						</div>
					</CardContent>
					<CardFooter className="justify-end">
						<Button
							type="submit"
							className="w-full"
							disabled={!isDirty || isLoading}>
							{isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</FormProvider>
	)
}
