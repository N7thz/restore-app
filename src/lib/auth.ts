import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("24h")
		.sign(encodedKey)
}

export async function decrypt(input: string) {
	try {
		const { payload } = await jwtVerify(input, encodedKey, {
			algorithms: ["HS256"],
		})
		return payload
	} catch (error) {
		console.error("Failed to verify JWT:", error)
		return null
	}
}
