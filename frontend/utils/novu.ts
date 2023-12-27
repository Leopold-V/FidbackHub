import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_API_KEY);

export async function sendNotif(description) {
  await novu.subscribers.identify('123', {
    firstName: 'Subscriber',
  });
  await novu.trigger('in-app', {
    to: {
      subscriberId: '123',
    },
    payload: {
      description: description,
    },
  });
}
