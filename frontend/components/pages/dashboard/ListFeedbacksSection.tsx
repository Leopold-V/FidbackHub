import { DividerTitle } from 'components/common/DividerTitle';
import { MouseEvent, useState } from 'react';
import { feedbackType } from 'types/index';
import { ListFeedbacks } from './ListFeedbacks';

export const ListFeedbacksSection = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
  const [feedbacksSorted, setfeedbacksSorted] = useState(feedbacks);

  const sortFeedbacksAscending = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.dataset.category;
    let newfeedbacks = [];
    if (category === "createdAt") {
      newfeedbacks = [...feedbacks].sort((a, b) => new Date(b[category]).getTime() - new Date(a[category]).getTime());
    } else {
      newfeedbacks = [...feedbacks].sort((a, b) => b[category].localeCompare(a[category]));
    }
    setfeedbacksSorted(newfeedbacks);
  };

  const sortFeedbacksDescending = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.dataset.category;
    let newfeedbacks = [];
    if (category === "createdAt") {
      newfeedbacks = [...feedbacks].sort((a, b) => new Date(a[category]).getTime() - new Date(b[category]).getTime());
    } else {
      newfeedbacks = [...feedbacks].sort((a, b) => a[category].localeCompare(b[category]));
    }
    setfeedbacksSorted(newfeedbacks);
  };

  return (
    <>
      <DividerTitle title="List of feedbacks" />
      <ListFeedbacks
        feedbacks={feedbacksSorted}
        sortFeedbacksAscending={sortFeedbacksAscending}
        sortFeedbacksDescending={sortFeedbacksDescending}
      />
    </>
  );
};
