/**
 * Next auth library type augmentations
 */
import { } from "next-auth"
import { SessionUser } from './types'

declare module "next-auth" {
	interface User {
		permissions: string[]
	}

	interface Session {
		user: SessionUser
	}
}