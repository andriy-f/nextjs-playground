// Centralized file for all authentication related logic
// This file is used to configure NextAuth.js
// https://next-auth.js.org/configuration/options
// This file can be placed anywhere in your project.
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./validation"
import { findUserByCredentials } from "../user/user"
import { partialAuthConfig } from "./auth.config"


export const { handlers, signIn, signOut, auth } = NextAuth({
	...partialAuthConfig,
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				// TODO: replace with method chaining: validation >>= findUserByCredentials
				const { success, data } = await signInSchema.safeParseAsync(credentials)
				if (success) {
					// Credentials are valid according to schema
					const { email, password } = data
					const user = await findUserByCredentials({ email, password })
					return user
				} else {
					// Credentials or whatever user entered doesn't match schema
					return null
				}
			}
		}),
	],
})