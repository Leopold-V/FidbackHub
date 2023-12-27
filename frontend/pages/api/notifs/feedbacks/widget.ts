import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await sendNotif(req.body.apikey, req.body.title);
    return res.status(200).json({ data: { message: 'notif successfully sent !' } });
  } else {
    res.status(404).json({ error: { message: 'Ressource not found' } });
  }
}

export async function sendNotif(apikey: string, title: string) {
  const novu = new Novu(process.env.NOVU_API_KEY);
  // TODO
  // Request server to find a project with the corresponding apikey
  const data = await fetch(`http://localhost:1337/api/projects/findwithtoken`, {
    method: 'POST',
    body: JSON.stringify({ data: { projectToken: apikey } }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  await novu.trigger('in-app-fidbackhub', {
    to: [{ type: 'Topic', topicKey: json.data.id.toString() }],
    payload: {
      description: `A user opened a new feedback "${title}" in project ${json.data.attributes.name}`,
    },
  });
  return true;
}
