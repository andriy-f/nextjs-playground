import React from 'react';
import { requireAuthentication } from '@/features/shared/dal';

const PLabel: React.FC<React.PropsWithChildren> = (props) => (<label
	className='block'
>{props.children}</label>)

const Profile: React.FC = async () => {
	const userData = await requireAuthentication();
	return (
		<div className='flex flex-col gap-4'>
			<PLabel>
				id
				<input
					className='block'
					type="text" defaultValue={userData.id} readOnly />
			</PLabel>
			<PLabel>
				email
				<input
					className='block'
					type="text"
					defaultValue={userData.email} readOnly />
			</PLabel>
			<PLabel>
				name
				<input
					className='block'
					type="text"
					defaultValue={userData.name} readOnly />
			</PLabel>
		</div>
	);
};

export default Profile;