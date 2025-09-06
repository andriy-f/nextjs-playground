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
import { signIn } from 'next-auth/react'
import { userCredentialsSchema } from '@/features/auth/validation';
import PFormField from '@/shared/ui/PFormField';
import { useRouter } from 'next/navigation';

/**
 * SignIn form on React Hook Forms (RHF) 
 */
export default function SignInFormOnRHF() {
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	const { register, handleSubmit, formState } = useForm({
		resolver: zodResolver(userCredentialsSchema),
	});

	return (
		<form onSubmit={handleSubmit((fieldValues) => {
			// Submit data
			setIsPending(true);
			signIn('credentials', {
				email: fieldValues.email,
				password: fieldValues.password,
				redirect: false,
			})
				.then((signInResp) => {
					console.log('si r', signInResp)
					switch (signInResp?.error) {
						case null: {
							// sign in successful, so redirect to callbackUrl page or root
							setErrorMessage(null);
							const { url } = signInResp
							if (signInResp.code === null && url && url.startsWith(location.origin)) {
								const urlParsed = new URL(url);
								const searchParams = new URLSearchParams(urlParsed.search);
								const cbUrl = searchParams.get('callbackUrl');
								console.log('redirecting...')
								if (cbUrl && cbUrl.startsWith(location.origin)) {
									router.replace(cbUrl);
								} else {
									router.replace('/')
								}
							}
							break;
						}
						case 'CredentialsSignin':
							setErrorMessage('Invalid credentials.');
							break;
						default:
							setErrorMessage('Something went wrong.');
					}
				})
				.catch((error) => {
					console.log('si e', error)
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
					<PFormField
						label="Email"
						icon={<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
						fieldError={formState.errors.email?.message?.toString()}
						{...register('email')}
					/>
					<PFormField
						label="Password"
						type="password"
						icon={<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
						fieldError={formState.errors.password?.message?.toString()}
						{...register('password')}
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