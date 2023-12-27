//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await createProject(req.body.projectId, req.body.userId, req.body.description);
    return res.status(200).json({ data: { message: 'Success' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function createProject(projectId: number, userId: number, title: string) {
  const novu = new Novu(process.env.NOVU_API_KEY);
  const result = await novu.topics.addSubscribers(projectId.toString(), {
    subscribers: [userId.toString()],
  });
  return result;
}
