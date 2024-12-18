import { PrismaClient } from '@prisma/client'
import { permissions } from '../src/features/auth/permissions'

const prisma = new PrismaClient()

const seedPermissions = async () => {
	await prisma.permission.createMany({
		data: [
			{ code: permissions.todoEdit },
			{ code: permissions.todoView },
		],
		skipDuplicates: true,
	})
}

const seedRoles = async () => {
	await prisma.role.upsert({
		where: { name: 'admin' },
		update: {
			permissions: {
				connect: [
					{ code: permissions.todoEdit },
					{ code: permissions.todoView },
				],
			},
		},
		create: {
			name: 'admin',
			permissions: {
				connect: [
					{ code: permissions.todoEdit },
					{ code: permissions.todoView },
				],
			},
		},
	})

	await prisma.role.upsert({
		where: { name: 'user' },
		update: {
			permissions: {
				connect: [
					{ code: permissions.todoView },
				],
			},
		},
		create: {
			name: 'user',
			permissions: {
				connect: [
					{ code: permissions.todoView },
				],
			},
		},
	})
}

const seedUsers = async () => {
	const passHash1 = '$2b$10$l.JNwn7.CSh6qu4anbj2YeRvXDijRztQLj5QcINoZHxrFvn6LbF6G'

	await prisma.user.upsert({
		where: { email: 'bob@example.com' },
		update: {
			passwordHash: passHash1,
			roles: {
				connect: [
					{ name: 'admin' }
				]
			},
		},
		create: {
			email: 'bob@example.com',
			passwordHash: passHash1,
			roles: {
				connect: [
					{ name: 'admin' }
				]
			},
		}
	})

	const passHash2 = '$2b$10$tig8bWjsnsixUr7IfpDqieNIR.m4rlCC9UUcixuuF25B0cMRtpB8W'
	await prisma.user.upsert({
		where: { email: 'alice@example.com' },
		update: {
			passwordHash: passHash2,
			roles: {
				connect: [
					{ name: 'user' }
				]
			},
		},
		create: {
			email: 'alice@example.com',
			passwordHash: passHash2,
			roles: {
				connect: [
					{ name: 'user' }
				]
			},
		}
	})
}

async function seedAll() {
	await seedPermissions()
	await seedRoles()
	await seedUsers()

}

seedAll()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})