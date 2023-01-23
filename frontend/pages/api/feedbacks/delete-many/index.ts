import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = await deleteManyFeedbacks(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

const deleteManyFeedbacks = async (req: NextApiRequest, res: NextApiResponse) => {
  const feedbacks = req.body.feedbacks;
  const data = await fetch(`http://localhost:1337/api/feedbacks/delete-many`, {
    method: 'POST',
    body: JSON.stringify({ data: [...feedbacks, 4] }),
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
