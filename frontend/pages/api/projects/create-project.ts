import { NextApiRequest, NextApiResponse } from "next";
import { generateKey } from "../../../utils/generate_api_key";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const data = await addProject(req, res);
      return res.status(200).json({...data});
    } else {
      res.status(404).json({ message: 'Ressource not found' })
    }
}

const addProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const project = req.body.project;
    const api_key = generateKey();
    const data = await fetch(`http://localhost:1337/api/projects`, {
        method: 'POST',
        body: JSON.stringify({data: {...project, api_key: api_key, user: project.userId}}),
        headers: {
            'Authorization': req.headers.authorization,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const json = await data.json();
    return json;
};