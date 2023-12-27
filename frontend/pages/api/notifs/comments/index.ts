import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await sendNotif(
      req.body.projectId,
      req.body.userId,
      req.body.feedbackId,
      req.body.authorName,
      req.body.projectTitle,
    );
    return res.status(200).json({ data: { message: 'notif successfully sent !' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function sendNotif(
  projectId: number,
  userId: number,
  feedbackId: number,
  authorName: string,
  projectTitle: string,
) {
  console.log(userId);

  const novu = new Novu(process.env.NOVU_API_KEY);
  await novu.trigger('in-app-fidbackhub', {
    to: [{ type: 'Topic', topicKey: projectId.toString() }],
    payload: {
      description: `${authorName} posted a new comment for feedback #${feedbackId.toString()} in project ${projectTitle}`,
    },
    actor: { subscriberId: userId.toString() },
  });
  return true;
}
