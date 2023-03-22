import { commentType } from 'types/index';

export const createComment = async (
  comment: Partial<commentType>,
  projectId: number,
  jwt: string,
): Promise<commentType> => {
  const data = await fetch(`http://localhost:3000/api/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment: { ...comment }, projectId: projectId }),
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
