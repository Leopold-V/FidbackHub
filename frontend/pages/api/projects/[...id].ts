import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const data = await updateProject(req, res);
    return res.status(200).json({ ...data });
  } else if (req.method === 'GET') {
    const data = await getProject(req, res);
    return res.status(200).json({ ...data });
  } else if (req.method === 'DELETE') {
    const data = await deleteProject(req, res);
    return res.status(200).json({ ...data });
  } else {
    res.status(404).json({ error: {message: 'Ressource not found'} });
  }
}

const getProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://localhost:1337/api/projects/${req.query.id}`, {
    method: 'GET',
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  console.log(json);
  return json;
};

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const project = req.body.project;
  const data = await fetch(`http://localhost:1337/api/projects/${project.id}`, {
    method: 'PUT',
    body: JSON.stringify({ data: { ...project } }),
    headers: {
      Authorization: req.headers.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};

const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fetch(`http://localhost:1337/api/projects/${req.query.id}`, {
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
