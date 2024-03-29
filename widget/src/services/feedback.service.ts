import { feedbackType, feedbackTypeType, metadataType } from '../types';

export const sendFeedback = async (
  feedback: Partial<feedbackType>,
  selectedType: feedbackTypeType,
  imageBase64: string,
  metadata: metadataType,
  apiKey: string,
) => {
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
        type: selectedType,
        projectToken: apiKey,
        screenshot: imageBase64,
        metadata: metadata,
        status: 'Open',
        state: 'New',
        priority: 'Low',
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
