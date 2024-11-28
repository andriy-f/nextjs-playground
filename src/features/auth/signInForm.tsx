'use client';

import {
	useState
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/features/shared/ui/fonts';
import { Button } from '@/features/shared/ui/button';
import { signInAction } from './serverActions'
import { signInSchema } from '@/features/auth/validation';
import PInput from '@/shared/ui/PInputWithLabel';
import ErrorUnderInput from '@/shared/ui/ErrorUnderInput';

export default function SignInForm() {
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { register, handleSubmit, formState } = useForm({
		resolver: zodResolver(signInSchema),
	});

	return (
		<form onSubmit={handleSubmit((fieldValues) => {
			const formData = new FormData();
			formData.append('email', fieldValues.email);
			formData.append('password', fieldValues.password);

			// Submit data
			setIsPending(true);
			signInAction(undefined, formData)
				.then((signInResult) => {
					setErrorMessage(signInResult ?? null);
				})
				.catch((error) => {
					setErrorMessage(error.message ?? 'Something else went wrong.');
				})
				.finally(() => {
					setIsPending(false);
				})
		})} className="space-y-3">
			<div className="flex-1 rounded-lg px-6 pb-4 pt-8">
				<h1 className={`${lusitana.className} mb-3 text-2xl`}>
					Please log in to continue.
				</h1>
				<div className="w-full space-y-1">
					<div>
						<PInput
							label="Email"
							icon={<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
							{...register('email')}
						/>
						<ErrorUnderInput>
							{formState.errors.email?.message?.toString()}
						</ErrorUnderInput>
					</div>
					<div>
						<PInput
							label="Password"
							type="password"
							icon={<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
							{...register('password')}
						/>
						<ErrorUnderInput>
							{formState.errors.password?.message?.toString()}
						</ErrorUnderInput>
					</div>
				</div>
				<Button className="mt-4 w-full" aria-disabled={isPending}>
					Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
				</Button>
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{errorMessage && (
						<>
							<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
							<p className="text-sm text-red-500">{errorMessage}</p>
						</>
					)}
				</div>
			</div>
		</form>
	);
}