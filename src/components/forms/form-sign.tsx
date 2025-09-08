"use client"

import { signIn } from "@/actions/sign-in"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { signSchema, type FormSignData } from "@/schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const FormSign = () => {

	const [visible, setVisible] = useState(false)

	const form = useForm<FormSignData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(signSchema),
	})

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = form

	const { push } = useRouter()

	async function onSignInSubmit(data: FormSignData) {
		await signIn(data)
			.then(() => push("/home"))
			.catch((err) =>
				toast({
					title: "Error",
					description: err.message,
					variant: "error",
				}),
			)
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
					className="w-full capitalize"
				>
					<Link href="/sign-up">
						Criar uma conta
					</Link>
				</Button>
				<Separator />
				<Button
					type="submit"
					className="w-1/2 self-end"
				>
					Confirmar
				</Button>
			</form>
		</Form>
	)
}
