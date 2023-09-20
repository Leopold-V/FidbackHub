import React from 'react';
import { userType } from 'types/index';
import { PageHeader } from 'components/common/PageHeader';
import { AccountDetails } from './AccountCard';
import { AvatarCard } from './AvatarCard';

const MyAccountPageComponent = ({ profile }: { profile: userType }) => {
  console.log(profile);

  return (
    <div className="flex flex-col justify-center items-center space-y-4 pb-8">
      <PageHeader label="My Account" />
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2">
        <AvatarCard profile={profile}></AvatarCard>
        <AccountDetails profile={profile} />
      </div>
    </div>
  );
};

export default MyAccountPageComponent;
