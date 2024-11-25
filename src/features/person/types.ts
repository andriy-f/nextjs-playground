import { propertiesOf, proxiedPropertiesOf } from '@/types'
import * as yup from 'yup'
import { Result } from '@/features/common/result'

export type PersonSaveResult = {
    // errors?: {
    // 	name?: string
    // 	choice?: string
    // 	count?: string
    // }
    errors?: string[]
    message?: string
}

export type AddPersonSuccessData = object

export type AddPersonFailData = {
    errors: string[]
}

export type AddPersonResult = Result<AddPersonSuccessData, AddPersonFailData>

export const lifePaths = ['bhakti', 'karma', 'jnana', 'bhukti', 'mukti'] as const

export type LifePath = typeof lifePaths[number]

export const personValidationSchema = yup.object({
    name: yup.string().min(1).required(),
    lifePath: yup.string().oneOf(lifePaths).required(),
    age: yup.number().positive().integer().required()
})

export type Person = yup.InferType<typeof personValidationSchema>

export const getPersonPropName = propertiesOf<Person>()

export const personProps = proxiedPropertiesOf<Person>()