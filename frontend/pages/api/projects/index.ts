import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = await getAllProjects(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ message: 'Ressource not found' });
  }
}

const getAllProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://localhost:1337/api/projects?populate=*`, {
    method: 'GET',
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
