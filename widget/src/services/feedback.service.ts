export type feedbackType = {
  title: string;
  description: string;
  author_email: string;
};

export const sendFeedback = async (feedback: feedbackType, apiKey: string) => {
  const data = await fetch(`http://localhost:1337/api/feedbacks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: {...feedback, projectToken: apiKey, type: 'Bug report', status: 'Open', state: 'New', user_ipv4: '1.2.3.4'} }),
  });
  const json = await data.json();
  return json;
};
