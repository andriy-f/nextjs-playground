import db from '@/db';
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export interface SessionUser {
	id: string
	email: string
	name: string
}

export interface CurrentUser {
	id: string
	email: string
	name: string
	permissions: string[]
}

type VerifyUserCredentialsResult = {
	valid: true,
	user: User
} | {
	valid: false,
	user: null
}

export const verifyUserCredentials = async ({ email, password }: { email: string, password: string }): Promise<VerifyUserCredentialsResult> => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	})

	if (!user) return { valid: false, user: null }
	else {
		const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
		return isCorrectPassword ? { valid: true, user: user } : { valid: false, user: null }
	}
}

export const findUser = async (userId: string) => {
	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			roles: {
				select: {
					permissions: {
						select: {
							code: true,
						},
					},
				},
			}
		}
	})

	return user
}