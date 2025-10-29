'use client';

import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/features/shared/ui/fonts';
import { Button } from '@/features/shared/ui/button';
import PFormField from '@/shared/ui/PFormField';
import { signIn } from '@/auth-client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type SignInFailRes = {
    error: {
        code?: string | undefined;
        message?: string | undefined;
        status: number;
        statusText: string;
    }
    data: null
}

type SignInSuccessRes = {
    error: null
    data: {
        redirect: boolean;
        token: string;
        url: string | undefined;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}

type SignInRes = SignInSuccessRes | SignInFailRes;

/**
 * SignIn form on use
 */
export default function SignInFormStd() {
    const [isPending, startTransition] = useTransition();
    const [loginRes, setLoginRes] = useState<SignInRes | null>(null)

    const router = useRouter();

    return (
        <form
            className="space-y-3"
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                    const res = await signIn.email({
                        email: formData.get('email')?.toString() ?? '',
                        password: formData.get('password')?.toString() ?? '',
                    });
                    if (res.error) {
                        setLoginRes(res)
                    } else {
                        setLoginRes(res)
                        setTimeout(() => {
                            router.push('/');
                        }, 1000);
                    }
                });
            }}
        >
            <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Please log in to continue.
                </h1>
                <div className="w-full space-y-1">
                    <PFormField
                        label="Email"
                        icon={<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
                        // fieldError={formState?.fieldErrors?.email?.join(' ')}
                        required
                        name='email'
                    />
                    <PFormField
                        label="Password"
                        type="password"
                        icon={<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />}
                        // fieldError={formState?.fieldErrors?.password?.join(' ')}
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
                    {loginRes && (
                        loginRes.error ?
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">{loginRes.error.message}</p>
                            </>
                            :
                            <>
                                <p className="text-sm text-green-500">Login successful! Redirecting...</p>
                            </>
                    )}
                </div>
            </div>
        </form>
    );
}