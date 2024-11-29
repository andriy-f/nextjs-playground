'use client';

import {
	useActionState
} from 'react';
import {
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/features/shared/ui/fonts';
import { Button } from '@/features/shared/ui/button';
import PFormField from '@/shared/ui/PFormField';
import { signInAction } from './serverActions';

/**
 * SignIn form on use
 */
export default function SignInFormStd() {
	const [formState, formAction, isPending] = useActionState(
		signInAction,
		undefined,
	);

	return (
		<form
			className="space-y-3"
			action={formAction}
		>
			<div className="flex-1 rounded-lg px-6 pb-4 pt-8">
				<h1 className={`${lusitana.className} mb-3 text-2xl`}>
					Please log in to continue.
				</h1>
				<div className="w-full space-y-1">
					<PFormField
						label="Email"
						icon={<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
						fieldError={formState?.emailError}
						required
						name='email'
					/>
					<PFormField
						label="Password"
						type="password"
						icon={<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
						fieldError={formState?.passwordError}
						required
						name='password'
					/>
				</div>
				<Button className="mt-4 w-full" aria-disabled={isPending}>
					Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
				</Button>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{formState?.generalError && (
						<>
							<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">{formState.generalError}</p>
						</>
					)}
				</div>
			</div>
		</form>
	);
}