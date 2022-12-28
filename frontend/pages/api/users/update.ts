import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = await updateUser(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ message: 'Ressource not found' });
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.body.userData;
  const data = await fetch(`http://localhost:1337/api/users/updateLoggedInUser`, {
    method: 'POST',
    body: JSON.stringify({ data: { ...user } }),
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
