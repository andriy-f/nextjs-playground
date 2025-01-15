'use server';

import { signIn, signOut } from './auth';
import { AuthError } from 'next-auth';
import { signInSchema } from './validation';

type SignInFormState = {
	fieldErrors?: {
		email?: string[]
		password?: string[]
	},
	genericError?: string
}

/**
 * server action for sign-in form (used via useActionState)
 */
export async function signInAction(
	_prevState: SignInFormState | undefined,
	formData: FormData,
): Promise<SignInFormState> {
	try {
		const { success, data, error } = await signInSchema.safeParseAsync(Object.fromEntries(formData))
		if (success) {
			await signIn('credentials', data);
			return {};
		} else {
			return { fieldErrors: error.flatten().fieldErrors };
		}
	} catch (error) {
		if (error instanceof AuthError) {
			// AuthError from NextAuth.js
			// Expected user error, like invalid credentials
			switch (error.type) {
				case 'CredentialsSignin':
					return { genericError: 'Invalid credentials.' };
				default:
					return { genericError: 'Something went wrong.' };
			}
		} else {
			// Unexpected error, so re-throw
			console.log('unexpected error, so re-throw')
			throw error;
		}
	}
}

export async function signOutAction() {
	await signOut();
}