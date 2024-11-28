'use client'

import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
	activeClassName?: string;
	nonActiveClassName?: string;
}

/**
 * NavLink component
 */
const NavLink = ({ className, activeClassName, nonActiveClassName, ...restOfProps }: NavLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === restOfProps.href;

	return (
		<Link
			{...restOfProps}
			aria-current={isActive ? 'page' : undefined}
			className={clsx(isActive ? activeClassName : nonActiveClassName, className)}
		/>
	)
}

export default NavLink;