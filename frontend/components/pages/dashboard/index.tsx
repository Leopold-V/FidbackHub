import { useSession } from 'next-auth/react';
import React from 'react'

/*
const usersQuery = gql`
  query fetchUser($userId: ID!) {
    user(id: $userId) {
      id
      username
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser($userId: ID!, $username: String) {
    updateUser(
      input: { where: { id: $userId }, data: { username: $username } }
    ) {
      user {
        id
        username
      }
    }
  }
`;
*/

const DashboardPageComponent = ({ params }) => {
  const { data: session, status } = useSession();
  
  // TODO => query corresponding project

/*
  const {
    loading: fetchUserFetching,
    error: fetchUserError,
    data: fetchUserData,
  } = useQuery(usersQuery, {
    variables: { userId: session.id },
  });

  useEffect(() => {
    if (fetchUserData) {
      const { username } = fetchUserData.user;

      setUsername(username || "");
    }
  }, [fetchUserData]);

  const [
    updateUser,
    { loading: updateUserFetching, error: updateUserError },
  ] = useMutation(updateUserMutation);
  */
  return (
    <div>Dashboard page { params.id} </div>
  )
}

export default DashboardPageComponent;