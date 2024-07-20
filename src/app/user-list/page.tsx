import React from 'react'
// import { PrismaClient } from '@prisma/client'
import prisma from '@/db'

// const prisma = new PrismaClient()

function Th(props: React.PropsWithChildren) {
	return (
		<th className='border border-black px-4 py-2'>{props.children}</th>
	);
}

function Td(props: React.PropsWithChildren) {
	return (
		<td className='border border-black px-4 py-2'>{props.children}</td>
	);
}

export default async function Page() {
	const users = await prisma.user.findMany();

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-4xl font-bold'>User List</h1>
			<div className='mt-5'>
				<table className='table-auto'>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th>Name</Th>
							<Th>Email</Th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<Td>{user.id}</Td>
								<Td>{user.name}</Td>
								<Td>{user.email}</Td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

