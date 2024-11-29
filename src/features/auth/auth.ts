// Centralized file for all authentication related logic
// This file is used to configure NextAuth.js
// https://next-auth.js.org/configuration/options
// This file can be placed anywhere in your project.
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./validation"
import { sitePaths } from "../shared/sitePaths"

const areValidCredentials = ({ email, password }: { email: string, password: string }) => {
	return email === 'root@gmail.info' && password === 'Arthur there'
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: sitePaths.signIn.href,
	},
	callbacks: {
		// The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
		authorized({ auth, request: { nextUrl } }) {
			const isSignedIn = !!auth?.user;
			const isOnSignInPage = nextUrl.pathname.startsWith(sitePaths.signIn.href);
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if (isOnSignInPage) {
				// works if using signInFormStd
				if (isSignedIn) {
					// TODO redirect to callbackUrl instead of profile
					return Response.redirect(new URL('/profile', nextUrl.origin));
				} else {
					return true
				}
			} else if (isOnDashboard) {
				return isSignedIn;
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
				const { success, data } = await signInSchema.safeParseAsync(credentials)
				if (success) {
					// Credentials are valid according to schema
					const { email, password } = data
					return areValidCredentials({ email, password })
						? { email: email } // User is authenticated
						: null // Invalid credentials
				} else {
					// Credentials or whatever user entered doesn't match schema
					return null
				}
			}
		}),
	],
})