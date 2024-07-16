import React from 'react';
import UserProfile from './profile/UserProfile';
import UserWrapper from '@/components/UserWrapper';

const UserPage: React.FC = () => {

    return (
        <UserWrapper>
            <UserProfile />
        </UserWrapper>
    )
};

export default UserPage;