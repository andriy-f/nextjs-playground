'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/db'
import { AddTodoFormValues } from '@/types';

export const addTodo = async (oldState: any, { title }: AddTodoFormValues) => {
    const todo = await prisma.todo.create({
        data: {
            title,
        },
    });

    revalidatePath('/todo-list')

    return {
        ...oldState,
    };
}