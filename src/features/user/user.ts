import db from '@/db';
import bcrypt from 'bcrypt'

export const findUserByCredentials = async ({ email, password }: { email: string, password: string }) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	})

	if (!user) return null
	else {
		const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
		return isCorrectPassword ? user : null
	}
}