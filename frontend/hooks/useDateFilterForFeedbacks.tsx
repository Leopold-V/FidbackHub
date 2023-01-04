import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { feedbackType } from 'types/index';

export const useDateFilterForFeedbacks = (feedbacks: feedbackType[]) => {
  const [dateRange, setdateRange] = useState({
    startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
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
  }, [dateRange]);

  return [feedbacksFiltered, dateRange, setdateRange];
};
