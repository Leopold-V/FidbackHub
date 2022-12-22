import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const data = await createRating(req, res);
      return res.status(200).json({...data});
    } else {
      res.status(404).json({ message: 'Ressource not found' })
    }
}

const createRating = async (req: NextApiRequest, res: NextApiResponse) => {
    const rating = req.body.rating;
    const data = await fetch(`http://localhost:1337/api/ratings`, {
        method: 'POST',
        body: JSON.stringify({ data: {...rating }}),
        headers: {
            'Authorization': 'Bearer ' + process.env.RATINGS_API_TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    return json;
}