import { signOutAction } from "@/features/auth/serverActions";
import { auth } from "@/features/auth/auth"
import Link from "next/link";
import React from "react";

const Li: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<li className="bg-slate-700 b">
			{children}
		</li>
	)
}
const Navigation = async () => {
	const session = await auth()
	const isAuthenticated = !!session?.user
	return (
		<nav className="flex">
			<ul className="flex space-x-3">
				<Li>
					<Link href="/">Home</Link>
				</Li>
				<li>
					<Link href="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link href="/auth/signin">Sign-in</Link>
				</li>
				<li>
					<Link href="/auth/signout">Sign-out</Link>
				</li>
				<li>
					<button onClick={signOutAction}>SignOut immediately</button>
				</li>
			</ul>
			<div className="justify-end">
				{isAuthenticated ? (
					<div>
						<p>Authorized</p>
					</div>
				) : (
					<div>
						<p>Unauthorized</p>
					</div>)
				}
			</div>
		</nav>
	)
};

export default Navigation;