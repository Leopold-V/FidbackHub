//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await deleteProject(req.body.projectId, req.body.userId, req.body.members, req.body.title);
    return res.status(200).json({ data: { message: 'Success' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function deleteProject(projectId: number, userId: number, members: string[], title: string) {
  const novu = new Novu(process.env.NOVU_API_KEY);
  await novu.trigger('in-app-fidbackhub', {
    to: [{ type: 'Topic', topicKey: projectId.toString() }],
    payload: {
      description: `The project "${title}" has been deleted.`,
    },
    actor: { subscriberId: userId.toString() },
  });
  // Can't delete a topic if we didn't delete subscribers before.
  await novu.topics.removeSubscribers(projectId.toString(), { subscribers: [...members, userId.toString()] });
  const result = await novu.topics.delete(projectId.toString());
  return result;
}
