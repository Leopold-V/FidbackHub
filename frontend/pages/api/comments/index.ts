import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = await createComment(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const comment = req.body.comment;
  const data = await fetch(`http://localhost:1337/api/comments`, {
    method: 'POST',
    body: JSON.stringify({ data: { ...comment }, projectId: req.body.projectId }),
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
