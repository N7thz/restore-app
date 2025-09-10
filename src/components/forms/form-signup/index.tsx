"use client"

import { createUser } from "@/actions/users/create-user"
import { SpanErrorMessage } from "@/components/span-error"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { signUpSchema, type FormSignUpProps } from "@/schemas/sign-up-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Info, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const FormSignUp = () => {

	const [visible, setVisible] = useState(false)

	const form = useForm<FormSignUpProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(signUpSchema),
	})

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = form

	const { push } = useRouter()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ["create-user"],
		mutationFn: (data: Prisma.UserCreateInput) => createUser(data),
		onSuccess: () => toast({
			title: "Usuario criado com sucesso",
			onAutoClose: () => push("/sign-in"),
		}),
		onError: (err) => toast({
			title: "Error",
			description: err.message,
			variant: "error",
		}),
	})

	async function onSubmit({
		email, username, password
	}: FormSignUpProps) {
		mutate({ email, username, password })
	}

	const isLoading = isPending || isSuccess

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 flex flex-col"
			>
				<div className="space-y-2">
					<Input
						placeholder="name@email.com"
						{...register("email")}
						className={cn(
							errors.email && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							],
						)}
					/>
					{errors.email && (
						<SpanErrorMessage
							message={errors.email.message}
						/>
					)}
				</div>
				<div className="space-y-2">
					<Input
						placeholder="user name"
						{...register("username")}
						className={cn(
							errors.username && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							],
						)}
					/>
					{errors.username && (
						<SpanErrorMessage
							message={errors.username.message}
						/>
					)}
				</div>
				<div className="space-y-2">
					<Input
						type={visible ? "text" : "password"}
						placeholder="**********"
						{...register("password")}
						className={cn(
							errors.password && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							],
						)}
					/>
					{errors.password && (
						<SpanErrorMessage
							message={errors.password.message}
						/>
					)}
				</div>
				<div className="space-y-2">
					<Input
						type={visible ? "text" : "password"}
						placeholder="**********"
						{...register("confirmPassword")}
						className={cn(
							errors.confirmPassword && [
								"focus-visible:ring-destructive",
								"not-focus-visible:border-destructive",
							],
						)}
					/>
					{errors.confirmPassword && (
						<SpanErrorMessage
							message={errors.confirmPassword.message}
						/>
					)}
					<Button
						type="button"
						variant={"link"}
						className="p-0"
						onClick={() => setVisible((visible) => !visible)}
					>
						show password
					</Button>
				</div>
				<Button
					asChild
					type="button"
					variant={"link"}
					className="w-full"
				>
					<Link href="/sign-in">
						Já tenho conta
					</Link>
				</Button>
				<Separator />
				<Button
					type="submit"
					className="w-1/2 self-end"
					disabled={isLoading}
				>
					{
						isLoading
							? <Loader2 className="animate-spin" />
							: "Confirmar"
					}
				</Button>
			</form>
		</Form>
	)
}
