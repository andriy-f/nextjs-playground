export interface SessionUser {
	id: string;
	email: string;
	name: string | null;
}

export interface CurrentUser {
	id: string;
	email: string;
	name: string | null;
	permissions: string[];
}

