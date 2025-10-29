'use client'

import { useSession } from '@/auth-client';
import SiteNavLink from '@/shared/ui/SiteNavLink';
import ProfileButton from './ProfileButton';
import NotificationButton from './NotificationButton';

const ProfileButtonOrSignIn: React.FC = () => {
    const session = useSession();

    const isAuthenticated = !!session.data
    return (
        isAuthenticated ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationButton />
                <ProfileButton />
            </div>
        ) : <SiteNavLink href="/auth/signin">Sign in</SiteNavLink>
    );
};

export default ProfileButtonOrSignIn;