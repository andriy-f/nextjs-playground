// Centralized file for all authentication related logic
// This file is used to configure NextAuth.js
// https://next-auth.js.org/configuration/options
// This file can be placed anywhere in your project.
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { userCredentialsSchema } from "./validation"
import { verifyUserCredentials } from "../user/user"
import { partialAuthConfig } from "./auth.config"

const parseUserCredentials = async (credentials: unknown) => userCredentialsSchema.parseAsync(credentials)

const authorize = (credentials: unknown) =>
	parseUserCredentials(credentials)
		.then(verifyUserCredentials)
		.then((verifyRes) => verifyRes.valid ? verifyRes.user : null)

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
			authorize: authorize,
		}),
	],
})