import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = await findHistories(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

const findHistories = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://localhost:1337/api/histories?id=${req.query.id[0]}`, {
    method: 'get',
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
