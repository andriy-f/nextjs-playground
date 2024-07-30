
'use client'

import React, { useState, useId } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import FormikCustomInput from '@/app/formik/FormikCustomInput'
import FormikCustomSelect from '@/app/formik/FormikCustomSelect'
import { addPersonChoice2 } from '@/actions'
import { PersonChoiceState, propertiesOf, propertyOf, proxiedPropertiesOf, shapeChoices, shapeChoicesMap } from '@/types'

const validationSchema = yup.object({
	name: yup.string().min(1).required(),
	shape: yup.string().oneOf(shapeChoices).required(),
	count: yup.number().required()
})

type FormDataType = yup.InferType<typeof validationSchema>

const getFormDataPropName = propertiesOf<FormDataType>()

const formDataProps = proxiedPropertiesOf<FormDataType>()

const FormikWithCustomComponents: React.FC = () => {
	const [formState, setFormState] = useState<PersonChoiceState>({})
	const [generalError, setGeneralError] = useState<string | null>(null)

	const nameId = useId()
	const shapeId = useId()
	const countId = useId()

	// TODO: this initial values are invalid compared to validation schema
	const initialValues = {
		name: '',
		shape: '',
		count: ''
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
				validationSchema={validationSchema}
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
							name={formDataProps.name}
						/>

						<FormikCustomSelect
							id={shapeId}
							label='Shape'
							// name={propertyOf<FormDataType>('shape')}
							// name={formDataProps('shape')}
							name={formDataProps.shape}
						>
							<option value=''>Select one</option>
							{shapeChoices.map((shape) => (
								<option key={shape} value={shape}>{shapeChoicesMap[shape].name}</option>
							))}
						</FormikCustomSelect>

						<FormikCustomInput
							id={countId}
							label='Count'
							name={formDataProps.count}
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
							type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormikWithCustomComponents