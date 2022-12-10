import React, { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react';
import { updateUser } from '../../../services/user.service';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { userType } from 'types/index';

export const ProfileForm = ({ profile, setProfile }: { profile: userType, setProfile: (user: userType) => void }) => {
    const { data: session } = useSession();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState<string | boolean>(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        try {
            const data = await updateUser(session.jwt, { username: profile.username });
            if (data.error) {
              seterror(data.error.message);
              setSuccess(false);
            } else {
              seterror(false);
              setSuccess(true);
            }
        } catch (error) {
            seterror(error.message);
            setSuccess(false);
        } finally {
            setloading(false);
        }
      };

  return (
    <form onSubmit={handleSubmit} className="text-center space-y-8">
    <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert />}
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Username
        </label>
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="flex max-w-lg rounded-md shadow-sm">
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              value={profile.username}
              className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setProfile({...profile, username: e.currentTarget.value})
              }
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
    <button
      type="submit"
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      disabled={loading}
    >
      Save
    </button>
    </form>
  )
}
