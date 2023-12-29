import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await sendNotif(req.body.projectId, req.body.userId, req.body.title, req.body.projectTitle, req.body.feedbackId);
    return res.status(200).json({ data: { message: 'notif successfully sent !' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function sendNotif(
  projectId: number,
  userId: number,
  title: string,
  projectTitle: string,
  feedbackId: number,
) {
  const novu = new Novu(process.env.NOVU_API_KEY);
  await novu.trigger('in-app-fidbackhub', {
    to: [{ type: 'Topic', topicKey: projectId.toString() }],
    payload: {
      description: `The feedback #${feedbackId} "${title}" has been updated in project ${projectTitle}`,
    },
    actor: { subscriberId: userId.toString() },
  });
  return true;
}
