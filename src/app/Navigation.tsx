import Link from "next/link";

const Navigation = () => (
	<nav >
		<ul className="flex space-x-3">
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/dashboard">Dashboard</Link>
			</li>
			<li>
				<Link href="/auth/signin">Sign-in</Link>
			</li>
			<li>
				<Link href="/auth/signout">Sign-out</Link>
			</li>
		</ul>
	</nav>
);

export default Navigation;