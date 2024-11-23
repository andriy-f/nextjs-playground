import { auth } from '@/features/auth/auth'

const Page = async () => {
	const session = await auth()
	return (
		<div>
			<h1>Dashboard</h1>
			<p>
				This is a dashboard page, supposedly protected by authentication.
			</p>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	)
}

export default Page