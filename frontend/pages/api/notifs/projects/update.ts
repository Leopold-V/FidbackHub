//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await updateProject(req.body.projectId, req.body.userId, req.body.title);
    return res.status(200).json({ data: { message: 'Success' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function updateProject(projectId: number, userId: number, title: string) {
  const novu = new Novu(process.env.NOVU_API_KEY);
  await novu.trigger('in-app-fidbackhub', {
    to: [{ type: 'Topic', topicKey: projectId.toString() }],
    payload: {
      description: `Project ${title} has been updated`,
    },
    actor: { subscriberId: userId.toString() },
  });

  return result;
}
