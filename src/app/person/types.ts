import { propertiesOf, proxiedPropertiesOf } from '@/types'
import * as yup from 'yup'

export type PersonSaveResult = {
    // errors?: {
    // 	name?: string
    // 	choice?: string
    // 	count?: string
    // }
    errors?: string[]
    message?: string
}

export const lifePaths = ['bhakti', 'karma', 'jnana', 'bhukti', 'mukti'] as const

export type LifePath = typeof lifePaths

export const personValidationSchema = yup.object({
    name: yup.string().min(1).required(),
    lifePath: yup.string().oneOf(lifePaths).required(),
    age: yup.number().positive().integer().required()
})

export type Person = yup.InferType<typeof personValidationSchema>

export const getPersonPropName = propertiesOf<Person>()

export const personProps = proxiedPropertiesOf<Person>()