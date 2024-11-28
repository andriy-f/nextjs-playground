import { useField } from 'formik';
import React, { useId } from 'react'

type Props = React.JSX.IntrinsicElements['select'] & {
	label: string
	name: string // fixed formik.useField, I guess this overrides optional name attribute, makes it mandatory
}

const FormikCustomSelect: React.FC<Props> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	const autoId = useId()
	const id = props.id ?? autoId

	return (
		<div className='mb-5'>
			<label
				className='block'
				htmlFor={id}
			>{label}</label>
			<select
				className='p-2 rounded-md'
				{...field}
				{...props}
				id={id}
			/>
			{meta.touched && meta.error ? (
				<div className="text-red-600">{meta.error}</div>
			) : null}
		</div>
	);
};

export default FormikCustomSelect