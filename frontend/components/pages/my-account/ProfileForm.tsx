import React, { FormEvent, useState } from 'react'

export const ProfileForm = ({ profile, setProfile, token }) => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        try {
            const data = await fetch(`http://localhost:1337/api/users/${profile.id}`, {
              method: 'put',
              body: JSON.stringify({ username: profile.username }),
              headers: {
                'authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            const json = await data.json();
            console.log(json);
            if (json.error) {
                seterror(json.error.message);
            }
            setloading(false);
        } catch (error) {
            seterror(error.message);
            setloading(false);
        }
      };


  return (
    <form onSubmit={handleSubmit} className="text-center space-y-8">
    <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
      <div className="font-semibold text-red-600">{error}</div>
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
