"use client"

import { signIn } from "@/actions/autheticate/sign-in"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { signInSchema, type FormSignProps } from "@/schemas/sign-in-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Prisma } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Info, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const FormSign = () => {

	const [visible, setVisible] = useState(false)

	const form = useForm<FormSignProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(signInSchema),
	})

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = form

	const { push } = useRouter()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ["sign-in"],
		mutationFn: (data: FormSignProps) => signIn(data),
		onSuccess: () => push("/home"),
		onError: (err) => toast({
			title: "Error",
			description: err.message,
			variant: "error",
		}),
	})

	const isLoading = isPending || isSuccess

	async function onSignInSubmit(data: FormSignProps) {
		mutate(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSignInSubmit)}
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
						<div className="text-destructive text-sm flex gap-2 items-center pt-1.5">
							<Info className="size-4" />
							<span>{errors.email.message}</span>
						</div>
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
						<div className="text-destructive text-sm flex gap-2 items-center pt-1.5">
							<Info className="size-4" />
							<span>{errors.password.message}</span>
						</div>
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
					<Link href="/sign-up">
						Criar uma conta
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
