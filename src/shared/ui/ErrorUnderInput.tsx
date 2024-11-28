import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

type ErrorUnderInputProps = React.PropsWithChildren;
const ErrorUnderInput: React.FC<ErrorUnderInputProps> = ({ children }) => {
	return children ? (
		<div className="flex space-x-1">
			<ExclamationCircleIcon className="inline-block text-red-500 w-5 h-5 mr-1" />
			<span className="text-sm text-red-500">{children}</span>

		</div>
	) : null;
};

export default ErrorUnderInput;