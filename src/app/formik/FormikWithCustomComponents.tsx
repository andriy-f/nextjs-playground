
'use client'

import React from 'react'
import { Formik, Form } from 'formik'
import FormikCustomInput from '@/app/formik/FormikCustomInput'
import FormikCustomSelect from '@/app/formik/FormikCustomSelect'
import { addPersonChoice2 } from '@/actions'
import { useFormState } from 'react-dom'

const FormikWithCustomComponents: React.FC = () => {
	return (
		<div>
			<h2 className='text-2xl text-center'>Formik with custom components</h2>
			<Formik
				initialValues={{
					name: '',
					choice: '',
					count: ''
				}}
				onSubmit={(data) => {
					console.log('submitting', data)
					addPersonChoice2(data)
				}}
			>
				{(formik) => (
					<Form className='text-center p-12'>
						<FormikCustomInput
							id='fms-name'
							label='name'
							name='name'
						/>

						<FormikCustomSelect
							id='fms-choice'
							label='choice'
							name='choice'
						>
							<option value=''>Select one</option>
							<option value='one'>One</option>
							<option value='two'>Two</option>
						</FormikCustomSelect>

						<FormikCustomInput
							id='fms-count'
							label='Count'
							name='count'
						/>

						<button type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormikWithCustomComponents