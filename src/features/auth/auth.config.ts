import { NextAuthConfig } from "next-auth"

import { NextResponse } from "next/server"
import { sitePaths } from "../shared/sitePaths"

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