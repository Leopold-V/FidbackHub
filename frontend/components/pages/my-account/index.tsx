import { gql, useMutation, useQuery } from "@apollo/client";
import { log } from "console";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";

const usersQuery = gql`
  query MeQuery {
    me {
      id
      username
      email
      confirmed
      blocked
      role {
        id
        name
        description
        type
      }
    }
  }
`;

const MyAccountPageComponent = () => {
  const [profile, setProfile] = useState({
    username: "",
    id: "",
    email: ""
  });
  const { data: session, status } = useSession();

  const {
    loading: fetchUserFetching,
    error: fetchUserError,
    data: fetchUserData,
  } = useQuery(usersQuery);

  useEffect(() => {
    if (fetchUserData) {
      const profile = fetchUserData.me;
      setProfile(profile || {
        username: "",
        id: "",
        email: ""
      });
    }
  }, [fetchUserData]);

  if (fetchUserFetching) {
    return <div className="flex flex-col justify-center items-center space-y-8">Loading user data...</div>;
  }

  if (fetchUserError) {
    return <p className="flex flex-col justify-center items-center space-y-8">Error: {fetchUserError.message}</p>;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:1337/api/users/${profile.id}`, {
      method: 'put',
      body: JSON.stringify({ username: profile.username }),
      headers: {
        'authorization': 'Bearer ' + session.jwt,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const json = await data.json();
    console.log(json);
  };

  const errorNode = () => {
    /*if (!updateUserError) {
      return false;
    }*/

    return (
      <div>
        error
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8">My Account</h1>
      {errorNode()}
      <form onSubmit={handleSubmit} className="text-center space-y-8">
      <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
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
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        disabled={false}
      >
        Save
      </button>
      </form>
    </div>
  );
};

export default MyAccountPageComponent;
