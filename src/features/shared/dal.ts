import 'server-only'

import { auth } from '@/features/auth/auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { CurrentUser } from '../auth/types'
import db from '@/db'
import { sitePaths } from './sitePaths'

/**
 * Get user data from session token
 */
export const requireAuthentication = cache(async () => {
	const session = await auth()

	if (!session?.user) {
		redirect(sitePaths.signIn.path)
	} else {
		return session.user
	}
})

/**
 * Get user data from database (based on user id from session token)
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
	const user = await requireAuthentication()
	if (!user) return null

	try {
		const userFromDb = await db.user.findUnique({
			where: {
				id: user.id,
			},
			select: {
				id: true,
				email: true,
				name: true,
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

		return userFromDb ? {
			id: user.id,
			permissions: userFromDb?.roles.flatMap((role) => role.permissions.map((permission) => permission.code)) ?? [],
			email: user.email,
			name: user.name,
		} : null
	} catch (_error) {
		console.log('Current user not found')
		return null
	}
})

export const viewerHasPermissions = async (permissions: string[]) => {
	const user = await getCurrentUser()

	// console.log('user', user)

	return user ? permissions.every((permission) => user.permissions?.includes(permission)) : false
}