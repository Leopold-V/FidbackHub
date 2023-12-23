export const getHistories = async (token: string) => {
  const data = await fetch(`http://localhost:3000/api/histories`, {
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
