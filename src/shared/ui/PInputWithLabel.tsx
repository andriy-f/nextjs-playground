import React from 'react';

interface PInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	icon?: React.ReactNode;
}

const PInput: React.FC<PInputProps> = ({ label, icon, ...props }) => {
	return (
		<>
			<label
				className="mb-3 mt-5 block text-xs font-medium"
			>
				{label}
				<div className="relative">
					<input
						className="block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
						{...props} />
					{icon}
				</div>
			</label>
		</>
	);
};

export default PInput;