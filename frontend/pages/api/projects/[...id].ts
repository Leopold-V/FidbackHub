import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
      const data = await updateProject(req, res);
      return res.status(200).json({...data});
    } else {
      res.status(404).json({ message: 'Ressource not found' })
    }
}

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const project = req.body.project;
    const data = await fetch(`http://localhost:1337/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({data: {...project}}),
        headers: {
            'Authorization': 'Bearer ' + process.env.PROJECTS_API_TOKEN,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    return json;
}