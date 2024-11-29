import NotAuthorized from '@/features/auth/NotAuthorized'
import { viewerHasPermissions } from '@/features/shared/dal'

const Page = async () => {
	const isAuthorized = await viewerHasPermissions(['canSeeDashboard'])

	return isAuthorized ? (
		<div>
			<h1>Dashboard</h1>
			<p>
				This is a dashboard page, supposedly protected by authentication.
			</p>
		</div>
	) : <NotAuthorized />
}

export default Page