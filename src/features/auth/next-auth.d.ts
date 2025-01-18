/**
 * Next auth library type augmentations
 */
import { } from "next-auth"
import { SessionUser } from './types'

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