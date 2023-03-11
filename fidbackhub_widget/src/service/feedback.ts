import { feedbackType } from 'types';

export const sendFeedback = async (feedback: feedbackType, apiKey: string) => {
  const response = await fetch('http://localhost:3000/api/feedbacks', {
    method: 'POST',
    body: JSON.stringify({
      feedback: {
        ...feedback,
        projectToken: apiKey,
      },
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};
