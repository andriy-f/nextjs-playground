export type SitePath = {
	name: string;
	href: string;
	requireAuthentication: boolean;
	requirePermissions: string[];
}

export const sitePaths = {
	signIn: {
		name: 'Sign In',
		href: '/auth/signin',
		requireAuthentication: false,
		requirePermissions: []
	},
	signOut: {
		name: 'Sign Out',
		href: '/auth/signout',
		requireAuthentication: true,
		requirePermissions: []
	},
	home: {
		name: 'Home',
		href: '/',
		requireAuthentication: false,
		requirePermissions: []
	},
	dashboard: {
		name: 'Dashboard',
		href: '/dashboard',
		requireAuthentication: true,
		requirePermissions: []
	},
	profile: {
		name: 'Profile',
		href: '/profile',
		requireAuthentication: true,
		requirePermissions: []
	},
	todo: {
		name: 'Todo',
		href: '/todo-list',
		requireAuthentication: true,
		requirePermissions: ['todo:view']
	},
	inactivityDetector: {
		name: 'Inactivity Detector',
		href: '/inactivity-detector',
		requireAuthentication: false,
		requirePermissions: []
	},
} satisfies { [key: string]: SitePath }
