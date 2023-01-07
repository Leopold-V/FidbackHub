import { MouseEvent, useState } from 'react';
import { feedbackType } from 'types/index';
import { ListFeedbacks } from './ListFeedbacks';

// TODO refactor component, change function filter and sort location
export const ListFeedbacksSection = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
  const [feedbacksSorted, setfeedbacksSorted] = useState(feedbacks);

  const sortFeedbacksAscending = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.dataset.category;
    let newfeedbacks = [];
    if (category === 'createdAt') {
      newfeedbacks = [...feedbacks].sort((a, b) => new Date(b[category]).getTime() - new Date(a[category]).getTime());
    } else {
      newfeedbacks = [...feedbacks].sort((a, b) => b[category].localeCompare(a[category]));
    }
    setfeedbacksSorted(newfeedbacks);
  };

  const sortFeedbacksDescending = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.dataset.category;
    let newfeedbacks = [];
    if (category === 'createdAt') {
      newfeedbacks = [...feedbacks].sort((a, b) => new Date(a[category]).getTime() - new Date(b[category]).getTime());
    } else {
      newfeedbacks = [...feedbacks].sort((a, b) => a[category].localeCompare(b[category]));
    }
    setfeedbacksSorted(newfeedbacks);
  };

  const filterStatus = (status: string) => {
    console.log(status);
    let newfeedbacks = [];
    newfeedbacks = [...feedbacks].filter((ele) => ele.status === status);
    setfeedbacksSorted(newfeedbacks);
  }

  return (
    <>
      <h2 className="font-medium mb-3">List feedbacks</h2>
      <ListFeedbacks
        feedbacks={feedbacksSorted}
        sortFeedbacksAscending={sortFeedbacksAscending}
        sortFeedbacksDescending={sortFeedbacksDescending}
        filterStatus={filterStatus}
      />
    </>
  );
};
