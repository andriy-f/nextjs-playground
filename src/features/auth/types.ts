export interface SessionUser {
	id: string;
	email: string;
	name: string | null;
	permissions: string[];
}

export interface CurrentUser {
	id: string;
	email: string;
	name: string | null;
	permissions: string[];
}

export type UserCredentials = {
	email: string,
	password: string
} 