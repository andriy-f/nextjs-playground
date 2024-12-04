import React from 'react';
import Profile from '@/features/profile/Profile';

const ProfilePage: React.FC = () => {
	return (
		<div>
			<section className='container mx-auto'>
				<h1 className='text-3xl'>Profile Page</h1>
				<Profile />
			</section>
		</div>
	);
};

export default ProfilePage;