import { z } from "zod"

export const userCredentialsSchema = z.object({
	email: z.email({
		error: (issue) => issue.input === undefined
			? "This field is required"
			: "Not an email"
	})
		.min(1, "Email is required"),
	password: z.string(
		{
			error: (issue) => issue.input === undefined
				? "This field is required"
				: "Not a string"
		}
	)
		.min(1, "Password is required")
		.max(32, "Password must be less than 32 characters"),
})

export const sessionUserSchema = z.object({
	id: z.string(),
	email: z.email(),
	name: z.string().nullable(),
	permissions: z.array(z.string()),
})