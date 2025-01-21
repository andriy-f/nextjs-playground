import NotAuthorized from '@/features/auth/NotAuthorized'
import { permissions } from '@/features/auth/permissions'
import { viewerHasPermissions } from '@/features/shared/dal'

const Page = async () => {
	// todo move auth check to middleware 
	const isAuthorized = await viewerHasPermissions([permissions.canSeeDashboard])

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