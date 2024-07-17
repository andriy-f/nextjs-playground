'use server'

import * as yup from 'yup'
import { PersonChoiceState } from '@/types'

export type Person = {
	first: string
	last: string
}

export const addPerson = async (person: Person) => {
	await new Promise((resolve) => setTimeout(resolve, 1000))
}

export type PersonChoice = {
	name: string
	choice: string
	count: number
}

const personChoiceSchema = yup.object({
	name: yup.string().min(2).required(),
	choice: yup.string().oneOf(['one', 'two']).required(),
	count: yup.number().required()
})

// not working as server action
export const addPersonChoice = async (formData: FormData) => {
	try {

		const pcParsed = await personChoiceSchema.validate(Object.fromEntries(formData.entries()))
		console.log('dummy saving person choice', pcParsed)
	} catch (e) {
		if (e instanceof yup.ValidationError) {
			console.log('dummy saving person validation error', e.errors)
			return e.errors
		} else {
			console.log('dummy saving person error', e)
		}
	}
}

export const addPersonChoice3 = async (prevState: PersonChoiceState, formData: FormData): Promise<PersonChoiceState> => {
	try {
		const pcParsed = await personChoiceSchema.validate(Object.fromEntries(formData.entries()))
		return {
			message: 'OK: dummy saving person choice 3 Done'
		}
	} catch (e) {
		if (e instanceof yup.ValidationError) {
			return {
				errors: e.errors
			}
		} else {
			return {
				message: 'dummy saving person error'
			}
		}
	}
}

export const addPersonChoice2 = async (data: unknown): Promise<PersonChoiceState> => {
	try {
		const pcParsed = await personChoiceSchema.validate(data)
		return {
			message: 'OK: dummy saving person choice 2 Done'
		}
	} catch (e) {
		if (e instanceof yup.ValidationError) {
			return {
				errors: e.errors
			}
		} else {
			return {
				errors: ['ERROR dummy saving person']
			}
		}
	}
}