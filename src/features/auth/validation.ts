import { z } from "zod"

export const userCredentialsSchema = z.object({
	email: z.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.max(32, "Password must be less than 32 characters"),
})

export const sessionUserSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	permissions: z.array(z.string()),
})