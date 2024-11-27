'use server';

import { signIn, signOut } from './auth';
import { AuthError } from 'next-auth';

/**
 * server action for sign-in form (used via useActionState)
 */
export async function signInAction(
	_prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			// AuthError from NextAuth.js
			// Expected user error, like invalid credentials
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		} else {
			// Unexpected error, so re-throw
			throw error;
		}

	}
}

export async function signOutAction() {
	await signOut();
}