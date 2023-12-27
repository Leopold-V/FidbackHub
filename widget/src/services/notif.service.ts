export const createFeedbackNotif = async (apikey: string, feedbackTitle: string) => {
  const result = await fetch('http://localhost:3000/api/notifs/feedbacks/widget', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apikey: apikey, title: feedbackTitle }),
  });
  return result;
};
