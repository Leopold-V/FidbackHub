import { feedbackStateType } from 'types/index';

export const feedbackColor = (state: feedbackStateType) => {
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
