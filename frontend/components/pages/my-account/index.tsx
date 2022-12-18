import React, { useState } from "react";
import { userType } from "types/index";
import { ProfileForm } from "./ProfileForm";

const MyAccountPageComponent = ({ profile }: { profile: userType }) => {
  const [_profile, setProfile] = useState({...profile});

  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-8">
      <h1 className="mt-2 text-lg font-semibold">My Account</h1>
      <ProfileForm profile={_profile} setProfile={setProfile} />
    </div>
  );
};

export default MyAccountPageComponent;
