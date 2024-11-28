'use client'

import React, { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'

import { addTodo } from '@/features/todo/todo-actions';
import { AddTodoFormValues } from '@/shared/types';

const validationSchema = yup.object({
	title: yup.string().required(),
});

const titleFieldName = 'title'

const AddTodo: React.FC = () => {
	const initialValues: AddTodoFormValues = {
		title: '',
	};

	const titleId = useId();

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, formikHelpers) => {
				formikHelpers.resetForm();
				await addTodo({}, values);
			}}
			validationSchema={validationSchema}
		>
			<Form
				className='flex flex-row items-center justify-center gap-2'
			>
				<div>
					<label htmlFor={titleId}>Title</label>
					<Field type="text" id={titleId} name={titleFieldName} />
					<ErrorMessage name={titleFieldName} component="div" />
				</div>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					type="submit">Add</button>
			</Form>
		</Formik>
	);
};

export default AddTodo;