import React, { useState } from "react";
import { userType } from "types/index";
import { ProfileForm } from "./ProfileForm";

const MyAccountPageComponent = ({ profile }: { profile: userType }) => {
  const [_profile, setProfile] = useState({...profile});

  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-8">
      <h1 className="mt-2 text-lg font-semibold">My Account</h1>
      {/* <ProfileForm profile={_profile} setProfile={setProfile} /> */}
      <div className="text-center space-y-8">
    <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
      <img
        className="inline-block h-14 w-14 rounded-full"
        src={profile.avatar_url}
        alt="user avatar"
      />
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <div className="block font-medium text-gray-700">
          Username:
        </div>
        <div className="sm:col-span-2">
         <span >{profile.username}</span> 
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <div className="block font-medium text-gray-700">
          Email: 
        </div>
        <div className="sm:col-span-2">
         <span>{profile.email}</span> 
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default MyAccountPageComponent;
