import { decrypt } from "@/lib/jwt-auth"
import type { MiddlewareConfig, NextRequest } from "next/server"
import { NextResponse } from "next/server"

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in"
const DEFAULT_AUTHENTICATED_REDIRECT = "/home"

export const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/sign-up", whenAuthenticated: "redirect" },
] as const

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname
	const publicRoute = publicRoutes.find((route) => path.startsWith(route.path))
	const token = request.cookies.get("token")?.value

	if (path === "/") {
		const redirectUrl = request.nextUrl.clone()

		redirectUrl.pathname = DEFAULT_AUTHENTICATED_REDIRECT

		return NextResponse.redirect(redirectUrl)
	}

	if (path.startsWith("/sign-in") && token) {
		try {
			const payload = await decrypt(token)
			if (payload) {
				return NextResponse.redirect(
					new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url),
				)
			}
		} catch (error) {
			console.error("Token verification failed:", error)
		}
	}

	if (publicRoute) {
		if (token && publicRoute.whenAuthenticated === "redirect") {
			return NextResponse.redirect(
				new URL(DEFAULT_AUTHENTICATED_REDIRECT, request.url),
			)
		}
		return NextResponse.next()
	}

	if (!token) {
		return redirectToSignIn(request)
	}

	try {

		const payload = await decrypt(token)

		if (!payload) {
			return redirectToSignIn(request)
		}

		const requestHeaders = new Headers(request.headers)
		requestHeaders.set("x-user-email", payload.email as string)

		return NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		})
	} catch (error) {
		console.error("Token verification failed:", error)
		return redirectToSignIn(request)
	}
}

function redirectToSignIn(request: NextRequest) {
	const redirectUrl = new URL(
		REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE,
		request.url,
	)
	redirectUrl.searchParams.set("from", request.nextUrl.pathname)
	return NextResponse.redirect(redirectUrl)
}

export const config: MiddlewareConfig = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
}
