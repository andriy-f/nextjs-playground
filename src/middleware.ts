// Next.js Middleware
// Middleware allows you to run code before a request is completed. 
// Then, based on the incoming request, you can modify the response by rewriting, redirecting, 
// modifying the request or response headers, or responding directly.

// Middleware runs before cached content and routes are matched. See Matching Paths for more details.
// Middleware is running in limited environment, so called "Edge", so it can't handle bcrypt. 
// See https://nextjs.org/learn/dashboard-app/adding-authentication#password-hashing

// See https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// Use the file middleware.ts (or .js) in the root of your project to define Middleware. 
// For example, at the same level as pages or app, or inside src if applicable.

// import { type NextRequest, NextResponse } from "next/server";

import NextAuth from "next-auth"
import { partialAuthConfig } from "@/features/auth/auth.config";

// Correct?
// export const middleware = auth(async (request: NextRequest) => {
//     if (request.nextUrl.pathname.startsWith('/dashboard')) {
//         console.log('middleware.ts: redirecting dashboard to /auth/signin')
//         return NextResponse.rewrite(new URL('/auth/signin', request.url))
//     }
// })

// Or like this if you need to do something here.
// export default auth((req: NextRequest) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

export const middleware = NextAuth(partialAuthConfig).auth;

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	/*
	 * Match all request paths except 
	 *   a) for the ones starting with:
	 *   - api (API routes)
	 *   - _next/static (static files)
	 *   - _next/image (image optimization files)
	 *   - favicon.ico, sitemap.xml, robots.txt (metadata files)
	 *   b) and .png files (images)
	 */
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)'],
};