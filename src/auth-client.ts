import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
    // baseURL: process.env.BASE_URL!, // Optional if the API base URL matches the frontend
})

export const { signIn, signOut, useSession } = authClient