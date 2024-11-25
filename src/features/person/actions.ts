'use server'
import * as yup from 'yup'
import * as R from 'ramda'

import { AddPersonFailData, Person, PersonSaveResult, personValidationSchema } from '@/features/person/types'
import { Result } from '@/features/common/result'

export type PersonServerSide = {
    name: string
    shape: string
    count: number
}

// const parseFormData = (formData: FormData): unknown => Object.fromEntries(formData.entries())

// not working as server action
export const addPersonChoice = async (formData: FormData) => {
    try {
        const pcParsed = await personValidationSchema.validate(Object.fromEntries(formData.entries()))
        console.log('dummy saving person choice', pcParsed)
    } catch (e) {
        if (e instanceof yup.ValidationError) {
            console.log('dummy saving person validation error', e.errors)
        } else {
            console.log('dummy saving person error', e)
        }
    }
}

export const addPersonChoice3 = async (_prevState: PersonSaveResult, formData: FormData): Promise<PersonSaveResult> => {
    try {
        await personValidationSchema.validate(Object.fromEntries(formData.entries()))
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
        await personValidationSchema.validate(data)
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

const validateAddPersonData = async (data: unknown): Promise<Result<Person, AddPersonFailData>> => {
    try {
        const pcParsed = await personValidationSchema.validate(data)
        return {
            type: 'success',
            successData: pcParsed
        }
    } catch (e) {
        if (e instanceof yup.ValidationError) {
            return {
                type: 'failure',
                failureData: {
                    errors: e.errors
                }
            }
        } else {
            return {
                type: 'failure',
                failureData: {
                    errors: ['ERROR parsing/validating person']
                }
            }
        }
    }

}

// const addPersonToDb = async (data: Person): Promise<AddPersonResult> => { }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addPersonPipe = R.pipeWith(
    (f, res) => R.andThen((x) => (x as Result<S, F>).type === 'success' ? f(x) : x, res),
    [
        validateAddPersonData,
        // addPersonToDb,
        console.log
    ])
// export const addPerson = async (data: unknown): Promise<AddPersonResult> => {
//     addPersonPipe()
// }