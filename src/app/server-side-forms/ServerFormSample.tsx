import React from 'react'
import { addPersonChoice } from '@/features/person/actions'

const ServerFormSample = () => {
	return (
		<form action={addPersonChoice}>

			<p>
				This is server form with server actions.
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
			<button type='submit'>Submit</button>
		</form>
	)
}

export default ServerFormSample