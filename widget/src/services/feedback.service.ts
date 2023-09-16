import { feedbackType } from '../types';

export const sendFeedback = async (feedback: feedbackType, imageBase64: string, apiKey: string) => {
  if (typeof apiKey === undefined) {
    return { message: 'Error: no api key' };
  }
  const data = await fetch(`http://localhost:1337/api/feedbacks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        ...feedback,
        projectToken: apiKey,
        screenshot: imageBase64,
        status: 'Open',
        state: 'New',
        user_ipv4: '0.0.0.0',
      },
    }),
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};
