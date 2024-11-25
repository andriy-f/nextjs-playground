// See https://nextjs.org/docs/app/building-your-application/routing/middleware#convention
// Use the file middleware.ts (or .js) in the root of your project to define Middleware. 
// For example, at the same level as pages or app, or inside src if applicable.

// import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@/features/auth/auth";

// export const middleware = auth(async (request: NextRequest) => {
//     if (request.nextUrl.pathname.startsWith('/dashboard')) {
//         console.log('middleware.ts: redirecting dashboard to /auth/signin')
//         return NextResponse.rewrite(new URL('/auth/signin', request.url))
//     }
// })

export const middleware = auth

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