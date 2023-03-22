import { feedbackType } from 'types/index';

export const createFeedback = async (feedback: Partial<feedbackType>, projectToken: string): Promise<any> => {
  const data = await fetch(`http://localhost:3000/api/feedbacks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ feedback: { ...feedback, projectToken } }),
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const deleteManyFeedbacks = async (feedbacks: string[], jwt: string): Promise<feedbackType> => {
  const data = await fetch(`http://localhost:3000/api/feedbacks/delete-many`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ feedbacks: feedbacks }),
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const deleteFeedback = async (id: number, jwt: string): Promise<feedbackType> => {
  const data = await fetch(`http://localhost:3000/api/feedbacks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const updateFeedback = async (feedback: Partial<feedbackType>, jwt: string): Promise<feedbackType> => {
  const data = await fetch(`http://localhost:3000/api/feedbacks/${feedback.id}`, {
    method: 'PUT',
    body: JSON.stringify({ feedback: { ...feedback } }),
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    console.log(json.error);
    throw new Error(json.error.message);
  }
  return json;
};

/* NOT USE, SAVE "IN CASE" :)
export const getFeedbacks = async (token: string, id: number) => {
  const data = await fetch(`http://localhost:3000/api/ratings?userId=${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};
*/
