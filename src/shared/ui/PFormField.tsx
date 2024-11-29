import React from 'react';
import ErrorUnderInput from './ErrorUnderInput';

interface PInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	icon?: React.ReactNode;
	fieldError?: string;
}

/**
 * FormField styled for this project 
 */
const PFormField: React.FC<PInputProps> = ({ label, icon, fieldError, ...props }) => {
	return (
		<div>
			<label
				className="mb-3 mt-5 block text-xs font-medium leading-6 text-blue-600"
			>
				{label}
				<div className="relative">
					<input
						className="pl-10 block w-full rounded-md border py-1 text-sm outline-2 placeholder:text-gray-500"
						{...props} />
					{icon}
				</div>
			</label>
			<ErrorUnderInput>
				{fieldError ?? 'test'}
			</ErrorUnderInput>
		</div>
	);
};

export default PFormField;