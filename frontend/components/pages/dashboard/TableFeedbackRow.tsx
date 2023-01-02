import dayjs from 'dayjs';
import React from 'react';
import { feedbackType } from 'types/index';
import { feedbackColor } from '../../../utils/feedback';

export const TableFeedbackRow = ({ feedback }: { feedback: feedbackType }) => {
  return (
    <tr className="divide-x divide-3Background bg-mainBackground border-4Background hover:bg-secondaryBackground duration-150 text-secondaryText">
      <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm  sm:pr-2">
        {dayjs(feedback.createdAt).format('YYYY-MM-DD').toString()}
      </td>
      <td className="whitespace-nowrap p-2 text-sm">{feedback.title}</td>
      <td className="whitespace-nowrap p-2">
        <span className={`text-${feedbackColor(feedback.status)}-800 px-2.5 py-0.5 bg-${feedbackColor(feedback.status)}-200 rounded-full text-sm`}>
          {feedback.status}
        </span>
      </td>
      <td className="whitespace-nowrap p-2 text-sm ">{feedback.author_email}</td>
    </tr>
  );
};
