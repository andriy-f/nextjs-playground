
'use client'

import React from 'react'
import { Formik, Form } from 'formik'
import FormikCustomInput from '@/app/formik/FormikCustomInput'
import FormikCustomSelect from './FormikCustomSelect'

const FormikWithCustomComponents: React.FC = () => {
	return (
		<div>
			<h2 className='text-2xl text-center'>Formik with custom components</h2>
			<Formik
				initialValues={{
					name: '',
					choice: ''
				}}
				onSubmit={(data) => {
					console.log('submitting', data)
				}}
			>
				{(formik) => (
					<Form className='text-center p-12'>
						<FormikCustomInput
							label='name'
							name='name'
						/>

						<FormikCustomSelect
							label='choice'
							name='choice'
						>
							<option value=''>Select one</option>
							<option value='one'>One</option>
							<option value='two'>Two</option>
						</FormikCustomSelect>

						<button type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormikWithCustomComponents