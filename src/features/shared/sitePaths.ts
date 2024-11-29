export type SitePath = {
	name: string;
	href: string;
}

export const sitePaths = {
	signIn: {
		name: 'Sign In',
		href: '/auth/signin',
	},
	signOut: {
		name: 'Sign Out',
		href: '/auth/signout',
	},
	home: {
		name: 'Home',
		href: '/',
	},
	dashboard: {
		name: 'Dashboard',
		href: '/dashboard',
	},
	profile: {
		name: 'Profile',
		href: '/profile',
	},
	todo: {
		name: 'Todo',
		href: '/todo-list',
	},
	inactivityDetector: {
		name: 'Inactivity Detector',
		href: '/inactivity-detector',
	},
} satisfies { [key: string]: SitePath }