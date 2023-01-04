import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const data = await updateFeedback(req, res);
    return res.status(200).json({ ...data });
  } else if (req.method === 'GET') {
    const data = await getFeedback(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ message: 'Ressource not found' });
  }
}

const getFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://localhost:1337/api/feedbacks/${req.query.id}`, {
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

const updateFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const feedback = req.body.feedback;
  const data = await fetch(`http://localhost:1337/api/feedbacks/${feedback.id}`, {
    method: 'PUT',
    body: JSON.stringify({ data: { ...feedback } }),
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};

/*
  const deleteFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await fetch(`http://localhost:1337/api/feedbacks/${req.query.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json;
  };
*/
