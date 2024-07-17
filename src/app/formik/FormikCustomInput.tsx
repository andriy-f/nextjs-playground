
import React from 'react'
import {
	type GenericFieldHTMLAttributes, useField,
	type Field, type FieldConfig,
	type FieldHookConfig, type FieldAttributes
} from 'formik'

// NOT working
// type Props = {
// 	label: string
// } & HTMLInputElement & {
// 	name: string // fixed formik.useField, I guess this overrides optional name attribute, makes it mandatory
// }

// NOT working
// type Props = {
// 	label: string
// } & GenericFieldHTMLAttributes & {
// 	name: string // fixed formik.useField, I guess this overrides optional name attribute, makes it mandatory
// }

// NOT working
// type Props = {
// 	label: string
// } & FieldConfig & {
// 	name: string // fixed useField
// }

// NOT working
// type Props = {
// 	label: string
// } & FieldHookConfig<any> & {
// 	name: string // fixed useField
// }

// IS working
// type Props = {
// 	label: string
// } & React.JSX.IntrinsicElements['input'] & {
// 	name: string // fixed formik.useField, I guess this overrides optional name attribute, makes it mandatory
// }

// IS working
// type Props = FieldAttributes<any>

type Props = FieldAttributes<any>

const FormikCustomInput: React.FC<Props> = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input>. We can use field meta to show an error
	// message if the field is invalid and it has been touched (i.e. visited)
	// useFiled<V> where V is type of value of input (defaults to any)
	const [field, meta] = useField(props);
	return (
		<div className='mb-5'>
			<label
				className='block'
				htmlFor={props.id || props.name}>{label}</label>
			<input
				className='rounded-md p-2'
				{...field}
				{...props} />
			{meta.touched && meta.error ? (
				<div className='text-red-600'>{meta.error}</div>
			) : null}
		</div>
	);
};

export default FormikCustomInput