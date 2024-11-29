'use client'

import { LinkProps } from "next/link";
import NavLink from "@/shared/ui/NavLink";
import { usePathname } from "next/navigation";

type SiteNavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps

/**
 * SiteNavLink component (for Header)
 */
const SiteNavLink = (props: SiteNavLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === props.href;

	return (
		<NavLink
			aria-current={isActive ? 'page' : undefined}
			className='rounded-md px-3 py-2 text-sm font-medium'
			activeClassName='bg-gray-900 text-white'
			nonActiveClassName='text-gray-300 hover:bg-gray-700 hover:text-white'
			{...props}
		/>

	)
}

export default SiteNavLink;