"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ModeToggle = () => {
	const { setTheme, theme: currentTheme } = useTheme()

	const icons = [
		{
			Icon: Sun,
			theme: "light",
		},
		{
			Icon: Moon,
			theme: "dark",
		},
		{
			Icon: Monitor,
			theme: "system",
		},
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-32">
				{icons.map(({ Icon, theme }) => (
					<DropdownMenuItem
						key={theme}
						onClick={() => setTheme(theme)}
						className={
							currentTheme === theme
								? "opacity-100 text-primary"
								: "opacity-60"
						}
					>
						<Icon className="size-4 opacity-60" aria-hidden="true" />
						<span className="capitalize">{theme}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
