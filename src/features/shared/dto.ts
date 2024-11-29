import 'server-only'
import { getCurrentUser } from '@/features/shared/dal'
import { type User } from 'next-auth'

// type User = Session["user"]

function canSeeUsername(_viewer: User) {
	return true
}

function canSeePhoneNumber(viewer: User) {
	return viewer.permissions.includes('canSeePhoneNumber')
}

export async function getUserProfileDTO(_slug: string) {

	const currentUser = await getCurrentUser()
	if (!currentUser) return null
	const user = { username: 'tester', profilePicUrl: 'https://example.com', phoneNumber: '1234567890' }

	// Or return only what's specific to the query here
	return {
		username: canSeeUsername(currentUser) ? user.username : null,
		phoneNumber: canSeePhoneNumber(currentUser)
			? user.phoneNumber
			: null,
	}
}