
'use client'

import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useFormState } from 'react-dom'
import { set } from 'zod'
import FormikCustomInput from '@/app/formik/FormikCustomInput'
import FormikCustomSelect from '@/app/formik/FormikCustomSelect'
import { addPersonChoice2 } from '@/actions'
import { PersonChoiceState } from '@/types'

const FormikWithCustomComponents: React.FC = () => {
	const [formState, setFormState] = useState<PersonChoiceState>({})
	const [generalError, setGeneralError] = useState<string | null>(null)
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
						{formState && formState.errors && formState.errors.map(e => (
							<div key={e} className='text-red-500'>{e}</div>
						))}

						{formState.message && <div className='text-green-500'>{formState.message}</div>}

						{generalError && <div className='text-red-500'>{generalError}</div>}

						<button type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormikWithCustomComponents