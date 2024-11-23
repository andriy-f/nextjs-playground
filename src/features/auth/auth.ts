import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./validation"
import { ZodError } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		// The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				return isLoggedIn;
				// if (isLoggedIn) return true;
				// return false; // Redirect unauthenticated users to login page
				// } else if (isLoggedIn) {
				// 	return Response.redirect(new URL('/dashboard', nextUrl));
			} else {
				return true;
			}
		},
	},
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				console.log('auth.ts authorize', credentials)
				try {
					let user = null

					// logic to verify if the user exists
					const { email, password } = await signInSchema.parseAsync(credentials)
					console.log('auth.ts authorize 2', email, password)
					user = (email === 'root@gmail.info' && password === 'Arthur there') ? { email: email } : null

					if (!user) {
						// No user found, so this is their first attempt to login
						// Optionally, this is also the place you could do a user registration
						throw new Error("Invalid credentials.") // TODO
					}

					// return user object with their profile data
					return user
				}
				catch (error) {
					console.log('auth.ts authorize error', error)
					if (error instanceof ZodError) {
						// Return `null` to indicate that the credentials are invalid
						return null
					} else {
						return null // TODO
					}
				}
			},
		}),
	],
})