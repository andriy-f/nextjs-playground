import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { nextCookies } from "better-auth/next-js";

// import { Pool } from "pg";
import db from "./db";

// TODO consider migrating to Kysely
export const auth = betterAuth({
    // database: new Pool({
    //     // connection options
    // }),
    database: prismaAdapter(db, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    // plugins: [
    // nextCookies()
    // ],
});