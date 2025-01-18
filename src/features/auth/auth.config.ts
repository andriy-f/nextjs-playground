import { NextAuthConfig } from "next-auth"

import { NextResponse } from "next/server"
import { sitePaths } from "../shared/sitePaths"
import { sessionUserSchema } from "./validation"

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

/** Auth config compatible with Nextjs Middleware */
export const partialAuthConfig = {
	pages: {
		signIn: sitePaths.signIn.href,
		signOut: sitePaths.signOut.href,
	},
	callbacks: {
		/** Enhance session data stored to jws cookie */
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id
				token.name = user.name
			}

			return token
		},
		/** Extract additional session user data from jwt from cookie */
		session: async ({ session, token }) => {
			const sessionUserParseRes = sessionUserSchema.safeParse(token)
			if (sessionUserParseRes.success) {
				session.user.id = sessionUserParseRes.data.id
				session.user.name = sessionUserParseRes.data.name
			} else {
				// TODO: maybe throw?
				console.log('invalid session data', sessionUserParseRes.error)
			}

			return session
		},
		// The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
		authorized({ auth, request: { nextUrl } }) {
			const isSignedIn = !!auth?.user; // TODO some user, but not necessarily having up-to-date data with DB
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
	providers: []
} satisfies NextAuthConfig