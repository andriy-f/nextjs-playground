import { } from "next-auth"

declare module "next-auth" {
	interface User {
		phoneNumber?: string
		permissions: string[]
	}
}