import { PrismaClient } from '@prisma/client'
import { permissions } from '../src/features/auth/permissions'
import { auth } from '../src/auth'

const prisma = new PrismaClient()

const seedPermissions = async () => {
    await prisma.permission.createMany({
        data: Object.values(permissions).map(permCode => ({ code: permCode })),
        skipDuplicates: true,
    })
}

const seedRoles = async () => {
    const adminRole = {
        name: 'admin',
        permissions: {
            connect: [
                { code: permissions.todoEdit },
                { code: permissions.todoView },
                { code: permissions.canSeeDashboard },
            ],
        },
    }
    await prisma.role.upsert({
        where: { name: adminRole.name },
        update: adminRole,
        create: adminRole,
    })

    const userRole = {
        name: 'user',
        permissions: {
            connect: [
                { code: permissions.todoView },
                { code: permissions.canSeeDashboard },
            ],
        },
    }

    await prisma.role.upsert({
        where: { name: userRole.name },
        update: userRole,
        create: userRole,
    })
}

const seedUsers = async () => {
    const bobUser = {
        name: 'Bob Admin',
        email: 'bob@example.com',
        password: 'haribolB2',
    }

    if (!await prisma.user.findUnique({ where: { email: bobUser.email } })) {
        await auth.api.signUpEmail({
            body: bobUser
        });

        await prisma.user.update({
            where: { email: bobUser.email },
            data: {
                roles: {
                    connect: [
                        { name: 'admin' }
                    ]
                },
            },
        });
    }


    const aliceUser = {
        name: 'Alice User',
        email: 'alice@example.com',
        password: 'haribolA1',
        roles: {
            connect: [
                { name: 'user' }
            ]
        }
    }

    if (!await prisma.user.findUnique({ where: { email: aliceUser.email } })) {
        await auth.api.signUpEmail({
            body: aliceUser
        });

        await prisma.user.update({
            where: { email: aliceUser.email },
            data: {
                roles: {
                    connect: [
                        { name: 'user' }
                    ]
                },
            },
        });
    }

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