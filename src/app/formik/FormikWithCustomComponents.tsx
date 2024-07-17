
'use client'

import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
// import { useFormState } from 'react-dom'
import FormikCustomInput from '@/app/formik/FormikCustomInput'
import FormikCustomSelect from '@/app/formik/FormikCustomSelect'
import { addPersonChoice2 } from '@/actions'
import { PersonChoiceState } from '@/types'

const validationSchema = yup.object({
	name: yup.string().min(1).required(),
	choice: yup.string().oneOf(['one', 'two']).required(),
	count: yup.number().required()
})

const FormikWithCustomComponents: React.FC = () => {
	const [formState, setFormState] = useState<PersonChoiceState>({})
	const [generalError, setGeneralError] = useState<string | null>(null)
	return (
		<div>
			<h2 className='text-xl text-center'>Formik with custom components</h2>
			<div
				className='mb-5 dark:text-gray-400'
			>
				Features client-side plus server-side validation
			</div>

			<Formik
				initialValues={{
					name: '',
					choice: '',
					count: ''
				}}
				validationSchema={validationSchema}
				onSubmit={(data) => {
					console.log('submitting', data)
					// here (when calling addPersonChoice2) happens AJAX request to server 
					// because addPersonChoice2 is server action
					!(async () => {
						const addResult = await addPersonChoice2(data)
						setFormState(addResult)
					})().catch(e => { setGeneralError(e.message) })

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
						{formState && formState.errors && <div className='mb-5'>
							{formState.errors.map(e => (
								<div key={e} className='text-red-500'>{e}</div>
							))}
						</div>
						}

						{formState.message && <div className='text-green-500'>{formState.message}</div>}

						{generalError && <div className='text-red-500 mb-4'>{generalError}</div>}

						<button
							className='rounded-md p-2.5 dark:bg-gray-800 dark:text-white'
							type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormikWithCustomComponents