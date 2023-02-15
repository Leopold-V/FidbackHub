import { userType } from 'types/index';

export const getUser = async (jwt: string): Promise<userType> => {
  const data = await fetch(`http://localhost:1337/api/users/me`, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};

export const findUserWithEmail = async (email: string, jwt: string): Promise<any> => {
  const data = await fetch(`http://localhost:1337/api/users/findUserWithEmail/${email}`, {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const updateUser = async (jwt: string, userData: Partial<userType>): Promise<userType> => {
  const data = await fetch(`http://localhost:3000/api/users/update`, {
    method: 'POST',
    body: JSON.stringify({ userData: { ...userData } }),
    headers: {
      authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};
