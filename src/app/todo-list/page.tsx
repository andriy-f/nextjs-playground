import React from 'react'

import prisma from '@/db'
import AddTodo from '@/app/todo-list/AddTodo';

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

type ThOrTdReactComponent = typeof Th | typeof Td

export default async function Page() {
	const todos = await prisma.todo.findMany();

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-4xl font-bold'>Todos</h1>
			<AddTodo />
			<div className='mt-5'>
				<table className='table-auto'>
					<thead>
						<tr>
							<Th>ID</Th>
							<Th>Title</Th>
							<Th>Done</Th>
						</tr>
					</thead>
					<tbody>
						{todos.map((user) => (
							<tr key={user.id}>
								<Td>{user.id}</Td>
								<Td>{user.title}</Td>
								<Td>{user.done}</Td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

