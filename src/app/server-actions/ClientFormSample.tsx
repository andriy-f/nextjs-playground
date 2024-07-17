'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import { addPersonChoice3 } from '@/actions'
import { PersonChoiceState } from '@/types'

const ClientFormSample = () => {
	const [state, formAction] = useFormState<PersonChoiceState, FormData>(addPersonChoice3, {})
	return (
		<form action={formAction}>

			<p>
				This is client form server actions.
			</p>
			<label className='block'>
				Name
				<input type="text" name='name' />
			</label>
			<label className='block'>
				Choice
				<select name='choice'>
					<option value=''>Select one</option>
					<option value='one'>One</option>
					<option value='two'>Two</option>
				</select>
			</label>
			<label className='block'>
				Count
				<input type="text" name='count' />
			</label>
			<div>
				Errors:
				{state.errors && state.errors.map((err, i) => (
					<div key={i} className='text-red-600'>{err}</div>
				))}
			</div>
			<div>
				{state.message && <div className='text-red-600'>Message: {state.message}</div>}
			</div>
			<button 
			  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
			type='submit'>Submit</button>
		</form>
	)
}

export default ClientFormSample