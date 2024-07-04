import { useField, FieldAttributes } from 'formik';
import React from 'react'

const FormikCustomSelect: React.FC<FieldAttributes<any>> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-5'>
			<label
				className='block'
				htmlFor={props.id || props.name}
			>{label}</label>
			<select
				className='text-black p-2'
				{...field}
				{...props} />
			{meta.touched && meta.error ? (
				<div className="text-red-600">{meta.error}</div>
			) : null}
		</div>
	);
};

export default FormikCustomSelect