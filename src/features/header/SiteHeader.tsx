import { Disclosure, DisclosureButton, DisclosurePanel, CloseButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { auth } from "@/features/auth/auth"
import NavLink from '@/shared/ui/NavLink';
import Image from 'next/image'
import { headerNavigation } from './header-navigation';
import NotificationButton from './NotificationButton';
import ProfileButton from './ProfileButton';
import SiteNavLink from '@/shared/ui/SiteNavLink';

export default async function Navbar() {
	const session = await auth()
	const isAuthenticated = !!session?.user
	return (
		<Disclosure as="nav" className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					{/* Mobile menu button, hidden if screen is wider than sm (640px) */}
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
							<XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
						</DisclosureButton>
					</div>

					{/* Central section of header */}
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center">
							{/* Site logo */}
							<Image
								src="/vercel.svg"
								alt="Vercel Logo"
								className="dark:invert"
								width={100}
								height={24}
								priority
							/>
						</div>
						{/* Desktop menu */}
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{headerNavigation.map((item) => (
									<SiteNavLink
										key={item.name}
										href={item.href}
									>
										{item.name}
									</SiteNavLink>
								))}
							</div>
						</div>
					</div>

					{/* Right section of header */}
					{isAuthenticated ? (
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<NotificationButton />
							<ProfileButton />
						</div>
					) : <SiteNavLink href="/auth/signin">Sign in</SiteNavLink>}
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state. */}
			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{headerNavigation.map((item) => (
						<CloseButton
							key={item.name}
							as={NavLink}
							href={item.href}
							className='block rounded-md px-3 py-2 text-base font-medium'
							activeClassName='bg-gray-900 text-white'
							nonActiveClassName='text-gray-300 hover:bg-gray-700 hover:text-white'
						>
							{item.name}
						</CloseButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}