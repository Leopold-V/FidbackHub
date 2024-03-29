import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = await createFeedback(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

const createFeedback = async (req: NextApiRequest, res: NextApiResponse) => {
  const forwarded = req.headers['x-forwarded-for'];
  //@ts-ignore
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  const ipArr = ip.split(':');
  const ipv4 = ipArr[ipArr.length - 1];
  const feedback = req.body.feedback;
  const data = await fetch(`http://localhost:1337/api/feedbacks`, {
    method: 'POST',
    body: JSON.stringify({ data: { ...feedback, status: 'Open', state: 'New', priority: 'Low', user_ipv4: ipv4 } }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
