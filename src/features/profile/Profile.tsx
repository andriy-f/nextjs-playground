import React from 'react';
import { getCurrentUser, requireAuthentication } from '@/features/shared/dal';

const PLabel: React.FC<React.PropsWithChildren> = (props) => (<label
	className='block'
>{props.children}</label>)

const Profile: React.FC = async () => {
	const userData = await requireAuthentication();
	const fullUserData = await getCurrentUser();
	return (
		<div>
			<div className='flex flex-col gap-4'>
				<h2 className='text-2xl'>Basic data</h2>
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
						defaultValue={userData.name ?? '<empty>'} readOnly />
				</PLabel>
			</div>
			<div className='flex flex-col gap-4'>
				<h2 className='text-2xl'>Extended data</h2>
				<PLabel>
					permissions
					<input
						className='block'
						type="text" defaultValue={fullUserData?.permissions.join(', ')} readOnly />
				</PLabel>
			</div>
		</div>
	);
};

export default Profile;