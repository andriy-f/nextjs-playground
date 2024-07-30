
'use client'

import React, { useState, useId } from 'react'
import { Formik, Form } from 'formik'

import FormikCustomInput from '@/components/FormikCustomInput'
import FormikCustomSelect from '@/components/FormikCustomSelect'
import { addPersonChoice2 } from './actions'
import { lifePaths, Person, personProps, PersonSaveResult, personValidationSchema } from '@/app/person/types'


const FormikWithCustomComponents: React.FC = () => {
	const [formState, setFormState] = useState<PersonSaveResult>({})
	const [generalError, setGeneralError] = useState<string | null>(null)

	const nameId = useId()
	const lifePathId = useId()
	const ageId = useId()

	// TODO: this initial values are invalid compared to validation schema
	// todo with this it's not working but no error
	// const initialValues = {
	// 	name: '',
	// 	shape: '',
	// 	count: ''
	// }

	// this is working
	const initialValues: Person = {
		name: '',
		lifePath: 'bhakti',
		age: 10
	}

	return (
		<div>
			<h2 className='text-xl text-center'>Formik with custom components</h2>
			<div
				className='mb-5 dark:text-gray-400 text-center'
			>
				Features client-side plus server-side validation
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={personValidationSchema}
				onSubmit={async (formData) => {
					console.log('submitting', formData)
					// here (when calling addPersonChoice2) happens AJAX request to server 
					// because addPersonChoice2 is server action
					try {
						const addResult = await addPersonChoice2(formData)
						setFormState(addResult)
					} catch (e) {
						const errMsg = (e != null
							&& typeof e === 'object'
							&& 'message' in e
						) ? e.message + '' : 'Unknown error'
						setGeneralError(errMsg)
					}
				}}
			>
				{(formik) => (
					<Form className='text-center p-12'>
						<FormikCustomInput
							id={nameId}
							label='Name'
							name={personProps.name}
						/>

						<FormikCustomSelect
							id={lifePathId}
							label='LifePath'
							name={personProps.lifePath}
						>
							<option value=''>Select one</option>
							{lifePaths.map((lifePath) => (
								<option key={lifePath} value={lifePath}>{lifePath}</option>
							))}
						</FormikCustomSelect>

						<FormikCustomInput
							id={ageId}
							label='Age'
							name={personProps.age}
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
							className='mt-2 box-border rounded-md p-2.5 dark:bg-gray-500 border-2 border-solid hover:border-solid hover:border-2 hover:border-white outline outline-2 -outline-offset-2 outline-white hover:outline-offset-8 hover:outline-transparent hover:transition-all ease-in-out'
							type='submit'
						>Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormikWithCustomComponents