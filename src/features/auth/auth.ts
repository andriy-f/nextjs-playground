// Centralized file for all authentication related logic
// This file is used to configure NextAuth.js
// https://next-auth.js.org/configuration/options
// This file can be placed anywhere in your project.
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { userCredentialsSchema } from "./validation"
import { verifyUserCredentials } from "../user/user"
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
				const { success, data } = await userCredentialsSchema.safeParseAsync(credentials)
				if (success) {
					// Credentials are valid according to schema
					const { email, password } = data
					const verifyRes = await verifyUserCredentials({ email, password })
					return verifyRes.valid ? verifyRes.user : null
				} else {
					// Credentials or whatever user entered doesn't match schema
					return null
				}
			}
		}),
	],
})