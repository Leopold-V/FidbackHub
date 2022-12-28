import { ratingType } from 'types/index';

export const getRatings = async (token: string, id: number) => {
  const data = await fetch(`http://localhost:3000/api/ratings?userId=${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
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
