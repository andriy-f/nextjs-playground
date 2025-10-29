// Next.js Middleware
// Middleware allows you to run code before a request is completed. 
// Then, based on the incoming request, you can modify the response by rewriting, redirecting, 
// modifying the request or response headers, or responding directly.

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { sitePaths } from "./features/shared/sitePaths"


// Middleware runs before cached content and routes are matched. See Matching Paths for more details.
// Middleware is running in limited environment, so called "Edge", so it can't handle bcrypt. 
// See https://nextjs.org/learn/dashboard-app/adding-authentication#password-hashing

// See https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// Use the file middleware.ts (or .js) in the root of your project to define Middleware. 
// For example, at the same level as pages or app, or inside src if applicable.

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!sessionCookie) {
        // return NextResponse.redirect(new URL("/", request.url));
        return NextResponse.redirect(new URL(sitePaths.signIn.path, request.url));
    }
    return NextResponse.next();
}

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
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)'],
    matcher: ['/dashboard'], // Apply middleware to specific routes
};