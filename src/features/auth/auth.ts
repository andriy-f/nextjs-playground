// Centralized file for all authentication related logic
// This file is used to configure NextAuth.js
// https://next-auth.js.org/configuration/options
// This file can be placed anywhere in your project.
import { NextResponse } from "next/server"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./validation"
import { sitePaths } from "../shared/sitePaths"

const findUserWithCredentials = async ({ email, password }: { email: string, password: string }) => {
	const rootEmail = 'root@gmail.info'
	const rootPass = 'Gopala'

	const simpleUserEmail = 'user1@gmail.info'
	const simpleUserPass = 'Haribol'

	if (email === rootEmail && password === rootPass)
		return {
			email: rootEmail,
			permissions: ['canSeePhoneNumber', 'dashboard', 'todos']
		}
	else if (email === simpleUserEmail && password === simpleUserPass)
		return {
			email: simpleUserEmail,
			permissions: []
		}
	else return null
}

const protectedRoutes = [
	sitePaths.dashboard.href,
	sitePaths.profile.href,
]

const isOnProtectedRoute = (pathname: string) => protectedRoutes.some(route => pathname.startsWith(route))

const getCallbackUrl = (nextUrl: URL) => {
	const searchParams = new URLSearchParams(nextUrl.search)
	return searchParams.get('callbackUrl')
}

const validateCallbackUrl = (callbackUrl: string, nextUrl: URL) => {
	return callbackUrl.startsWith(nextUrl.origin)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: sitePaths.signIn.href,
		signOut: sitePaths.signOut.href,
	},
	callbacks: {
		// The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
		authorized({ auth, request: { nextUrl } }) {
			const isSignedIn = !!auth?.user;
			const isOnSignInPage = nextUrl.pathname.startsWith(sitePaths.signIn.href);
			const isOnSignOutPage = nextUrl.pathname.startsWith(sitePaths.signOut.href);
			const onProtectedRoute = isOnProtectedRoute(nextUrl.pathname);
			if (isOnSignInPage) {
				// works if using signInFormStd
				if (isSignedIn) {
					// Redirect to callbackUrl if it's valid
					const callbackUrl = getCallbackUrl(nextUrl);
					const isValidCallbackUrl = callbackUrl && validateCallbackUrl(callbackUrl, nextUrl);
					const redirectTo = isValidCallbackUrl ? callbackUrl : '/';
					const redirectToUrl = new URL(redirectTo, nextUrl.origin);
					return NextResponse.redirect(redirectToUrl);
				} else {
					return true // stay on sign in page
				}
			} else if (isOnSignOutPage) {
				if (isSignedIn) return true
				else return NextResponse.redirect(new URL('/', nextUrl.origin))
			} else if (onProtectedRoute) {
				return isSignedIn;
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
					return findUserWithCredentials({ email, password })
				} else {
					// Credentials or whatever user entered doesn't match schema
					return null
				}
			}
		}),
	],
})