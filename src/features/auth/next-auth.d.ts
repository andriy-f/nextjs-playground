import { } from "next-auth"
import { SessionUser } from '@/features/user/user'

declare module "next-auth" {
	// interface User {
	// 	// All fields are optional and depend on the provider:
	// 	phoneNumber?: string
	// 	permissions?: string[]
	// }

	interface Session {
		user: SessionUser
	}
}