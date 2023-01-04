import React, { MouseEvent, useEffect, useState } from 'react';
import { Pagination } from 'components/common/Pagination';
import { feedbackType } from 'types/index';
import { TableFeedbackRow } from './TableFeedbackRow';

function ListFeedbacksTableHeader(props) {
  return (
    <thead className="bg-secondaryBackground">
      <tr className="divide-x divide-3Background">
        <th scope="col" className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondaryText">Date</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortFeedbacksDescending} data-category="createdAt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button className="ml-2" onClick={props.sortFeedbacksAscending} data-category="createdAt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>{' '}
          </div>
        </th>
        <th scope="col" className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondaryText">Title</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortFeedbacksDescending} data-category="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button className="ml-2" onClick={props.sortFeedbacksAscending} data-category="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        </th>
        <th scope="col" className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondaryText">State</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortFeedbacksDescending} data-category="state">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button className="ml-2" onClick={props.sortFeedbacksAscending} data-category="state">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        </th>
        <th scope="col" className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondaryText">Author email</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortFeedbacksDescending} data-category="author_email">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button className="ml-2" onClick={props.sortFeedbacksAscending} data-category="author_email">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
}

export const ListFeedbacks = ({
  feedbacks,
  sortFeedbacksAscending,
  sortFeedbacksDescending,
}: {
  feedbacks: feedbackType[];
  sortFeedbacksAscending: (e: MouseEvent<HTMLButtonElement>) => void;
  sortFeedbacksDescending: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const pageLength = 10;
  const pageNumber = Math.ceil(feedbacks.length / pageLength);

  const [feedbacksToDisplay, setFeedbacksToDisplay] = useState(feedbacks.slice(0, pageLength));
  const [pageIndex, setpageIndex] = useState(0);
  const [currentPageFirstFeedbacksIndex, setcurrentPageFirstFeedbacksIndex] = useState(pageLength * pageIndex);

  useEffect(() => {
    setcurrentPageFirstFeedbacksIndex(pageLength * pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    setFeedbacksToDisplay(
      feedbacks.slice(
        currentPageFirstFeedbacksIndex * pageIndex,
        currentPageFirstFeedbacksIndex * pageIndex + pageLength,
      ),
    );
  }, [currentPageFirstFeedbacksIndex, feedbacks]);

  return (
    <div className="sm:px-6">
      <div className="mt-8 flex flex-col">
        <div className="sm:-mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg border border-3Background">
              <table className="min-w-full divide-y divide-3Background">
                <ListFeedbacksTableHeader
                  sortFeedbacksAscending={sortFeedbacksAscending}
                  sortFeedbacksDescending={sortFeedbacksDescending}
                />
                <tbody className="divide-y divide-3Background bg-mainBackground">
                  {feedbacksToDisplay.map((feedback) => (
                    <TableFeedbackRow key={feedback.id} feedback={feedback} />
                  ))}
                </tbody>
              </table>
              <Pagination
                pageIndex={pageIndex}
                setpageIndex={setpageIndex}
                pageNumber={pageNumber}
                totalratings={feedbacks.length}
                nbCurrentFeedbackDisplay={feedbacksToDisplay.length}
                pageLength={pageLength}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
