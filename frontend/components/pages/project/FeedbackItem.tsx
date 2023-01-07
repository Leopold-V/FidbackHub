import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { feedbackType } from 'types/index';
import { feedbackColor } from '../../../utils/feedback';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

export const FeedbackItem = ({ feedback }: { feedback: feedbackType }) => {
  const [color, setcolor] = useState('');

  useLayoutEffect(() => {
    setcolor(feedbackColor(feedback.state));
  }, [])

  return (
    <Link href={`http://localhost:3000/feedback/${feedback.id}`}>
      <li className="grid grid-cols-4 p-4 hover:text-indigo-500 text-mainText cursor-pointer bg-mainBackground border-4Background hover:bg-secondaryBackground duration-200">
       <div className="flex flex-col col-span-2">
        <div className="text-sm mb-0 sm:mb-2">{feedback.title}</div>
        <div className="sm:flex items-center hidden text-gray-400">
          <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm ml-2">{feedback.author_email}</span>
        </div>
       </div>
       <div className="col-span-1 w-full flex items-center">
        <div
            className={`text-${color}-800 px-2.5 py-1 bg-${color}-200 rounded-full w-24 text-center sm:text-sm text-xs`}
          >
            {feedback.state}
        </div>
       </div>
        <div className="flex items-center col-span-1">
          <span className="sm:text-sm text-xs w-full text-right text-gray-400">
            {dayjs(feedback.createdAt).format('llll').toString()}
          </span>
        </div>
      </li>
    </Link>
  );
};
