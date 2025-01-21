import db from '@/db';
import bcrypt from 'bcrypt'

type VerifyUserCredentialsResult = {
	valid: true,
	user: {
		id: string,
		name: string | null,
		email: string,
		permissions: string[]
	}
} | {
	valid: false,
	user: null
}

export const verifyUserCredentials = async ({ email, password }: { email: string, password: string }): Promise<VerifyUserCredentialsResult> => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
			name: true,
			email: true,
			passwordHash: true,
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

	if (!user) return { valid: false, user: null }
	else {
		const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
		return isCorrectPassword ? {
			valid: true, user: {
				id: user.id,
				name: user.name,
				email: user.email,
				permissions: user?.roles.flatMap((role) => role.permissions.map((permission) => permission.code)) ?? [],
			}
		} : { valid: false, user: null }
	}
}
