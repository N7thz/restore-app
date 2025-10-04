import { ac } from "@/auth/permissions"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin as adminPlugin } from "better-auth/plugins"
import { prisma } from "./prisma"
import { admin, user } from "@/auth/permissions"

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	account: {
		accountLinking: {
			enabled: true,
		},
	},
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [
		adminPlugin({
			ac,
			roles: { admin, user },
		}),
	],
})
