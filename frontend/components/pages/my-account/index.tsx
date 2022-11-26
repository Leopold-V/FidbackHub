import React, { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useFetch } from "../../../hooks/useFetch";
import { ProfileForm } from "./ProfileForm";

const MyAccountPageComponent = () => {
  const [profile, setProfile] = useState({
    username: "",
    id: "",
    email: ""
  });
  const { data: session, status } = useSession();

  const { data, error, loading } = useFetch(`http://localhost:1337/api/users/${session.id}`, session.jwt);

  useEffect(() => {
    if (data) {
      setProfile({
        username: data.username,
        id: data.id,
        email: data.email
      })
    }
  }, [data])
  

  if (loading) {
    return <div className="flex flex-col justify-center items-center space-y-8">Loading user data...</div>;
  }

  if (error) {
    return <p className="flex flex-col justify-center items-center space-y-8">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-8">My Account</h1>
      <ProfileForm profile={profile} token={session.jwt} setProfile={setProfile} />
    </div>
  );
};

export default MyAccountPageComponent;
