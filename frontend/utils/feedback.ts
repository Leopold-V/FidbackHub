import { feedbackStateType, feedbackType } from 'types/index';

export const feedbackColor = (state: feedbackStateType): string => {
  switch (state) {
    case 'New':
      return 'blue';
    case 'In progress':
      return 'yellow';
    case 'Resolved':
      return 'green';
    case 'Rejected':
      return 'red';
    default:
      break;
  }
};

export const findDiffForHistory = (oldFeedback: Partial<feedbackType>, newFeedback: Partial<feedbackType>) => {
  const change = [];
  if (oldFeedback.state !== newFeedback.state) {
    change.push(`state has been modified from ${oldFeedback.state} to ${newFeedback.state}`);
  }
  if (oldFeedback.status !== newFeedback.status) {
    change.push(`status has been modified from ${oldFeedback.status} to ${newFeedback.status}`);
  }
  if (oldFeedback.type !== newFeedback.type) {
    change.push(`type has been modified from ${oldFeedback.type} to ${newFeedback.type}`);
  }
  return change;
};
