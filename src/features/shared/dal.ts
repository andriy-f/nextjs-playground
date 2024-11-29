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

		return user
	} catch (error) {
		console.log('Failed to fetch user', error)
		return null
	}
})