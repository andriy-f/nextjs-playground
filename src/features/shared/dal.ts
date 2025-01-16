import 'server-only'

import { auth } from '@/features/auth/auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { CurrentUser, findUser } from '../user/user'

export const requireAuthentication = cache(async () => {
	const session = await auth()

	if (!session?.user) {
		redirect('/login')
	} else {
		return session.user
	}
})

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
	const user = await requireAuthentication()
	if (!user) return null

	try {
		const userFull = await findUser(user.id)

		return userFull ? {
			id: user.id,
			permissions: userFull?.roles.flatMap((role) => role.permissions.map((permission) => permission.code)) ?? [],
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