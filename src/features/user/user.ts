import db from '@/db';
import bcrypt from 'bcrypt'
import { UserCredentials } from '../auth/types';

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

export const verifyUserCredentials = async ({ email, password }: UserCredentials): Promise<VerifyUserCredentialsResult> => {
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

	return user !== null
		? (
			await bcrypt.compare(password, user.passwordHash)
				// when password matches
				? {
					valid: true,
					user: {
						id: user.id,
						name: user.name,
						email: user.email,
						permissions: user?.roles.flatMap((role) => role.permissions.map((permission) => permission.code)) ?? [],
					}
				}
				// when password does not match
				: {
					valid: false,
					user: null
				}
		)
		// when user not found by email
		: {
			valid: false,
			user: null
		}
}
