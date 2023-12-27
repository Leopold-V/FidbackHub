//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await removeSub(req.body.projectId, req.body.userId, req.body.newMemberId, req.body.title);
    return res.status(200).json({ data: { message: 'Success' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function removeSub(projectId: number, userId: number, newMemberId: number, title: string) {
  const novu = new Novu(process.env.NOVU_API_KEY);
  const result = await novu.topics.removeSubscribers(projectId.toString(), {
    subscribers: [newMemberId.toString()],
  });
  await novu.trigger('in-app-fidbackhub', {
    to: {
      subscriberId: newMemberId.toString(),
    },
    payload: {
      description: `You have been removed from the project "${title}"`,
    },
    actor: { subscriberId: userId.toString() },
  });

  return result;
}
