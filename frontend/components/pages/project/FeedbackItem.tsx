import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { feedbackType } from 'types/index';
import { feedbackColor } from '../../../utils/feedback';

export const FeedbackItem = ({ feedback }: { feedback: feedbackType }) => {
  const [color, setcolor] = useState('');

  useLayoutEffect(() => {
    setcolor(feedbackColor(feedback.state));
  }, [])

  return (
    <Link href={`http://localhost:3000/feedback/${feedback.id}`}>
      <li className="hover:text-indigo-500 cursor-pointer bg-mainBackground border-4Background hover:bg-secondaryBackground duration-200 text-secondaryText">
        <div className="text-sm">{feedback.title}</div>
        <div className="flex">
          <span className="text-sm">
            {dayjs(feedback.createdAt).format('YYYY-MM-DD').toString()}
          </span>
          <span
            className={`text-${color}-800 px-2.5 py-0.5 bg-${color}-200 rounded-full text-sm`}
          >
            {feedback.state}
          </span>
          <span className="text-sm">{feedback.author_email}</span>
        </div>
      </li>
    </Link>
  );
};
