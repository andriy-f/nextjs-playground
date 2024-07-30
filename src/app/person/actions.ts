'use server'
import * as yup from 'yup'

import { PersonSaveResult, personValidationSchema } from "./types"

export type PersonServerSide = {
    name: string
    shape: string
    count: number
}

// not working as server action
export const addPersonChoice = async (formData: FormData) => {
    try {

        const pcParsed = await personValidationSchema.validate(Object.fromEntries(formData.entries()))
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

export const addPersonChoice3 = async (prevState: PersonSaveResult, formData: FormData): Promise<PersonSaveResult> => {
    try {
        const pcParsed = await personValidationSchema.validate(Object.fromEntries(formData.entries()))
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

export const addPersonChoice2 = async (data: unknown): Promise<PersonSaveResult> => {
    try {
        const pcParsed = await personValidationSchema.validate(data)
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