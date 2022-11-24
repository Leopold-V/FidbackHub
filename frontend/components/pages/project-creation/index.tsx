import { useSession } from 'next-auth/react';
import React from 'react'

/*
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

const ProjectCreationComponent = () => {
    const { data: session, status } = useSession();

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
    <div>Project creation page</div>
  )
}

export default ProjectCreationComponent;
