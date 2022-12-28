import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = await createRating(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ message: 'Ressource not found' });
  }
}

const createRating = async (req: NextApiRequest, res: NextApiResponse) => {
  const forwarded = req.headers['x-forwarded-for'];
  //@ts-ignore
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  console.log(ip);
  const ipArr = ip.split(':');
  const ipv4 = ipArr[ipArr.length - 1];
  console.log(ipArr);
  const rating = req.body.rating;
  const data = await fetch(`http://localhost:1337/api/ratings`, {
    method: 'POST',
    body: JSON.stringify({ data: { ...rating, user_ipv4: ipv4 } }),
    headers: {
      Authorization: 'Bearer ' + process.env.RATINGS_API_TOKEN,
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
