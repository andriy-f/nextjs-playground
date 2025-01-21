import { AuthError, NextAuthConfig } from "next-auth"

import { NextResponse } from "next/server"
import { getPathInfo, sitePaths } from "../shared/sitePaths"
import { sessionUserSchema } from "./validation"

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
		signIn: sitePaths.signIn.path,
		signOut: sitePaths.signOut.path,
	},
	callbacks: {
		/** Enhance session data stored to jws cookie */
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id
				token.name = user.name
				token.permissions = user.permissions
			}

			return token
		},
		/** Extract additional session user data from jwt from cookie */
		session: async ({ session, token }) => {
			const sessionUserParseRes = sessionUserSchema.safeParse(token)
			if (sessionUserParseRes.success) {
				session.user.id = sessionUserParseRes.data.id
				session.user.name = sessionUserParseRes.data.name
				session.user.permissions = sessionUserParseRes.data.permissions
			} else {
				// TODO: maybe throw?
				console.log('invalid session data', sessionUserParseRes.error)
				const err = new AuthError('invalid_session_data')
				err.type = 'JWTSessionError'
				throw err
			}

			return session
		},
		// The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
		authorized({ auth, request: { nextUrl } }) {
			const isSignedIn = !!auth?.user; // TODO some user, but not necessarily having up-to-date data with DB
			const isOnSignInPage = nextUrl.pathname.startsWith(sitePaths.signIn.path);
			const isOnSignOutPage = nextUrl.pathname.startsWith(sitePaths.signOut.path);
			const pathInfo = getPathInfo(nextUrl.pathname);

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
			} else if (pathInfo !== null) {
				if (pathInfo.requireAuthentication) {
					return pathInfo.requirePermissions.every(permission => auth?.user?.permissions?.includes(permission))
				} else {
					return true;
				}
			} else {
				throw new Error('Path not registered (contact developers)')
			}
		}
	},
	providers: []
} satisfies NextAuthConfig