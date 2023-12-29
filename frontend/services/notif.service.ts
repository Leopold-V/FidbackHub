import { userType } from 'types/index';

export const invitToProjectNotif = async (projectId: number, userId: string, newMemberId: string, title: string) => {
  const result = await fetch('http://localhost:3000/api/notifs/projects/addsub', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId: projectId, userId: userId, newMemberId: newMemberId, title: title }),
  });
  return result;
};

export const removeFromProjectNotif = async (projectId: number, userId: number, newMemberId: number, title: string) => {
  const result = await fetch('http://localhost:3000/api/notifs/projects/removesub', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId: projectId, userId: userId, newMemberId: newMemberId, title: title }),
  });
  return result;
};

export const sendCreateProjectNotif = async (projectId: number, userId: number, title: string) => {
  const result = await fetch('http://localhost:3000/api/notifs/projects', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId: projectId, userId: userId, title: title }),
  });
  return result;
};

export const deleteProjectNotif = async (projectId: number, userId: number, members: userType[], title: string) => {
  const result = await fetch('http://localhost:3000/api/notifs/projects/delete', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: projectId,
      userId: userId,
      members: [...members].map((ele) => ele.id),
      title: title,
    }),
  });
  return result;
};

export const sendUpdateProjectNotif = async (projectId: number, userId: number, title: string) => {
  const result = await fetch('http://localhost:3000/api/notifs/projects/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId: projectId, userId: userId, title: title }),
  });
  return result;
};

export const sendUpdateFeedbackNotif = async (
  projectId: number,
  userId: number,
  feedbackTitle: string,
  projectTitle: string,
  feedbackId: number,
) => {
  const result = await fetch('http://localhost:3000/api/notifs/feedbacks/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: projectId,
      userId: userId,
      title: feedbackTitle,
      projectTitle: projectTitle,
      feedbackId: feedbackId,
    }),
  });
  return result;
};

export const createFeedbackNotif = async (
  projectId: number,
  userId: number,
  feedbackTitle: string,
  projectTitle: string,
) => {
  const result = await fetch('http://localhost:3000/api/notifs/feedbacks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId: projectId, userId: userId, title: feedbackTitle, projectTitle: projectTitle }),
  });
  return result;
};

export const newCommentNotif = async (
  projectId: number,
  userId: number,
  feedbackId: number,
  authorName: string,
  projectTitle: string,
) => {
  const result = await fetch('http://localhost:3000/api/notifs/comments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: projectId,
      userId: userId,
      feedbackId: feedbackId,
      authorName: authorName,
      projectTitle: projectTitle,
    }),
  });
  return result;
};
