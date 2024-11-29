import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { signOutAction } from "@/features/auth/serverActions";
import Link from 'next/link'
import { sitePaths } from '../shared/sitePaths';

const profileLinks = [
	{ name: sitePaths.profile.name, href: sitePaths.profile.href },
	// { name: sitePaths.signOut.name, href: sitePaths.signOut.href },
]

const ProfileButton: React.FC = () => {
	return (
		<Menu as="div" className="relative ml-3" >
			<div>
				<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5" />
					<span className="sr-only">Open user menu</span>
					<UserCircleIcon aria-hidden="true" className="size-6" />
				</MenuButton>
			</div>
			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
			>
				{profileLinks.map((item) => (
					<MenuItem key={item.name}>
						<Link
							href={item.href}
							className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
						>
							{item.name}
						</Link>
					</MenuItem>))}
				<MenuItem
					as="button"
					className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full text-left "
					onClick={signOutAction}
				>
					Sign out now
				</MenuItem>
			</MenuItems>
		</Menu >
	);
};

export default ProfileButton;