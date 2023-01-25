import dayjs from 'dayjs';
import { userType } from 'types/index';

export const AccountDetails = ({ profile }: { profile: userType }) => {
  return (
    <>
      <h2 className="font-medium">Details</h2>
      <div className="border border-3Background bg-mainBackground hover:border-4Background duration-200 p-1 sm:rounded">
        <div className="divide-y divide-3Background">
          <div className="text-sm flex justify-center items-center p-4">
            <span className="sm:w-1/4 w-3/4 mx-auto">Username</span>
            <div className="sm:w-1/2 w-3/4 flex">
              <p className="text-secondaryText">{profile.username}</p>
            </div>
          </div>
          <div className="text-sm flex justify-center items-center p-4">
            <span className="sm:w-1/4 w-3/4 mx-auto">Email</span>
            <div className="sm:w-1/2 w-3/4 flex">
              <p className="text-secondaryText">{profile.email}</p>
            </div>
          </div>
          <div className="text-sm flex justify-center items-center p-4">
            <span className="sm:w-1/4 w-3/4 mx-auto">Registration date</span>
            <div className="sm:w-1/2 w-3/4 flex">
              <p className="text-secondaryText">{dayjs(profile.createdAt).format('YYYY-MM-DD')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
