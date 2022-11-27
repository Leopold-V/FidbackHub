import React, { useState } from "react";
import { ProfileForm } from "./ProfileForm";

const MyAccountPageComponent = ({ profile }) => {
  const [_profile, setProfile] = useState({...profile});

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8">My Account</h1>
      <ProfileForm profile={_profile} setProfile={setProfile} />
    </div>
  );
};

export default MyAccountPageComponent;
