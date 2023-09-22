import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { feedbackType } from 'types/index';

// passing the projectId to force rerender with useeffect when changing page id params
export const useDateFilterForFeedbacks = (feedbacks: feedbackType[], projectId: number, initialValue: string) => {
  const [dateRange, setdateRange] = useState({
    startDate: initialValue,
    endDate: dayjs(new Date()).format('YYYY-MM-DD'),
  });
  const [feedbacksFiltered, setfeedbacksFiltered] = useState(JSON.parse(JSON.stringify(feedbacks)));

  const filterFeedbacks = (feedbacks: feedbackType[]) => {
    const newFeedbacks = feedbacks.filter(
      (ele) =>
        dayjs(ele.createdAt).isBetween(dayjs(dateRange.startDate), dayjs(dateRange.endDate), 'date', '[]') === true,
    );
    return newFeedbacks;
  };

  useEffect(() => {
    const newFeedbacks = filterFeedbacks(feedbacks);
    setfeedbacksFiltered([...newFeedbacks]);
  }, [dateRange, projectId, feedbacks]);

  return [feedbacksFiltered, dateRange, setdateRange, setfeedbacksFiltered];
};
