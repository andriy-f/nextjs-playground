import { } from "next-auth"

declare module "next-auth" {
	interface User {
		// All fields are optional and depend on the provider:
		phoneNumber?: string
		permissions?: string[]
	}
}