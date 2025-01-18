import db from '@/db';
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

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
