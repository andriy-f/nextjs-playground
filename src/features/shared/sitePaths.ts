export type PathInfo = {
	name: string;
	path: string;
	requireAuthentication: boolean;
	requirePermissions: string[];
}

export const sitePaths = {
	signIn: {
		name: 'Sign In',
		path: '/auth/signin',
		requireAuthentication: false,
		requirePermissions: []
	},
	signOut: {
		name: 'Sign Out',
		path: '/auth/signout',
		requireAuthentication: true,
		requirePermissions: []
	},
	home: {
		name: 'Home',
		path: '/',
		requireAuthentication: false,
		requirePermissions: []
	},
	dashboard: {
		name: 'Dashboard',
		path: '/dashboard',
		requireAuthentication: true,
		requirePermissions: []
	},
	profile: {
		name: 'Profile',
		path: '/profile',
		requireAuthentication: true,
		requirePermissions: []
	},
	todo: {
		name: 'Todo',
		path: '/todo-list',
		requireAuthentication: true,
		requirePermissions: ['todo:view']
	},
	inactivityDetector: {
		name: 'Inactivity Detector',
		path: '/inactivity-detector',
		requireAuthentication: false,
		requirePermissions: []
	},
} satisfies { [key: string]: PathInfo }

/**
 * 
 * @param relPath Relative path ('/dashboard' for example)
 * @returns 
 */
export const getPathInfo = (relPath: string): PathInfo | null => {
	const pageInfo = Object.values(sitePaths).find(page => relPath.startsWith(page.path));
	return pageInfo || null;
}