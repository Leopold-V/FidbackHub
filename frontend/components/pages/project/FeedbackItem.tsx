import dayjs from 'dayjs';
import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import { feedbackType } from 'types/index';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

export const FeedbackItem = ({
  feedback,
  setcountchecked,
  checkedFeedbacks,
  setcheckedFeedbacks,
}: {
  feedback: feedbackType;
  setcountchecked: (countchecked: number) => void;
  checkedFeedbacks: any;
  setcheckedFeedbacks: (checkedFeedbacks: any) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // @ts-ignore
      setcountchecked((countchecked) => (countchecked += 1));
    } else {
      // @ts-ignore
      setcountchecked((countchecked) => (countchecked -= 1));
    }
    setcheckedFeedbacks((checkedFeedbacks) => ({ ...checkedFeedbacks, [e.target.dataset.feedback]: e.target.checked }));
  };

  return (
    <li className="flex items-center space-x-4 p-4 hover:text-indigo-500 text-mainText border-4Background hover:bg-secondaryBackground duration-200">
      <input
        onChange={handleChange}
        id="checkfeedback"
        checked={checkedFeedbacks[feedback.id]}
        className="rounded bg-3Background w-3.5 h-3.5"
        data-feedback={feedback.id}
        type="checkbox"
      />
      <Link href={`http://localhost:3000/feedback/${feedback.id}`}>
        <div className="cursor-pointer flex items-center justify-between w-full">
          <div className="flex items-center space-x-3 col-span-3">
            <div className="flex flex-col">
              <div className="text-sm mb-0 sm:mb-2">{feedback.title}</div>
              <div className="sm:flex items-center hidden text-gray-400">
                <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm ml-2">{feedback.author_email}</span>
              </div>
            </div>
          </div>
          {/* <div className="col-span-1 w-full flex items-center">
        <div
        className={`text-${color}-800 px-2.5 py-1 bg-${color}-200 rounded-full w-24 text-center sm:text-sm text-xs`}
        >
        {feedback.state}
        </div>
      </div> */}
          <div className="flex items-center">
            <span className="sm:text-sm text-xs w-full text-right text-gray-400">
              {dayjs(feedback.createdAt).format('llll').toString()}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};
