'use server';

import { signIn, signOut } from './auth';
import { AuthError } from 'next-auth';

type SignInFormState = {
	emailError?: string
	passwordError?: string
	generalError?: string
}

/**
 * server action for sign-in form (used via useActionState)
 */
export async function signInAction(
	_prevState: SignInFormState | undefined,
	formData: FormData,
): Promise<SignInFormState> {
	try {
		await signIn('credentials', formData);
		return {}
	} catch (error) {
		if (error instanceof AuthError) {
			// AuthError from NextAuth.js
			// Expected user error, like invalid credentials
			switch (error.type) {
				case 'CredentialsSignin':
					return { generalError: 'Invalid credentials.' };
				default:
					return { generalError: 'Something went wrong.' };
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