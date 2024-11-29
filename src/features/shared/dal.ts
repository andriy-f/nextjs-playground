import 'server-only'

import { auth } from '@/features/auth/auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const verifySession = cache(async () => {
	const session = await auth()

	if (!session?.user) {
		redirect('/login')
		return { authenticated: false, user: null }
	} else {
		return { authenticated: true, user: session.user }
	}
})

export const getCurrentUser = cache(async () => {
	const session = await verifySession()
	if (!session) return null

	try {
		const user = session.user
		// todo: here was expected to be a call to the backend to get actual user data, actual permissions, etc.

		return user
	} catch (error) {
		console.log('Failed to fetch user', error)
		return null
	}
})

export const viewerHasPermissions = async (permissions: string[]) => {
	const user = await getCurrentUser()

	console.log('user', user)

	return user ? permissions.every((permission) => user.permissions?.includes(permission)) : false
}