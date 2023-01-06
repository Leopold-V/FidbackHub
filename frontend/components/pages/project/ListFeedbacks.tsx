import React, { MouseEvent, useEffect, useState } from 'react';
import { Pagination } from 'components/common/Pagination';
import { feedbackType } from 'types/index';
import { FeedbackItem } from './FeedbackItem';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';


function ListFeedbacksHeader({ sortFeedbacksAscending, sortFeedbacksDescending, filterStatus }) {
  const [selectedStatus, setselectedStatus] = useState("Open");

  const handleClickStatus = (e: MouseEvent<HTMLButtonElement>) => {
    setselectedStatus(e.currentTarget.dataset.status);
    filterStatus(e.currentTarget.dataset.status);
  }

  return (
    <div className="bg-secondaryBackground divide-x divide-3Background flex justify-between p-4">
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2" data-status="Open" onClick={handleClickStatus}>
          <LockOpenIcon className={`h-5 w-5 duration-200 hover:text-green-400 text-green-400 ${selectedStatus === "Open" ? 'text-green-600' : 'text-green-800'}`} aria-hidden="true" />
          <span className={`duration-200 hover:text-green-400 text-sm font-medium ${selectedStatus === "Open" ? 'text-green-400' : 'text-green-800'}`}>Open</span>
        </button>
        <button className="flex items-center space-x-2" data-status="Close" onClick={handleClickStatus}>
          <LockClosedIcon className={`h-5 w-5 duration-200 hover:text-red-400 text-red-400 ${selectedStatus === "Close" ? 'text-red-600' : 'text-red-800'}`} aria-hidden="true" />
          <span className={`duration-200 hover:text-red-400 text-sm font-medium ${selectedStatus === "Close" ? 'text-red-400' : 'text-red-800'}`}>Close</span>
        </button>
      </div>
      <div className="space-x-6 flex items-center">
          <div className="flex items-center space-x-1 text-secondaryText hover:text-mainText duration-200">
            <span className="text-sm ">Date</span>
            <ButtonGroupFilter sortFeedbacksAscending={sortFeedbacksAscending} sortFeedbacksDescending={sortFeedbacksDescending} filterName="createdAt" />
          </div>
          <div className="flex items-center space-x-1 text-secondaryText hover:text-mainText duration-200">
            <span className="text-sm ">Title</span>
            <ButtonGroupFilter sortFeedbacksAscending={sortFeedbacksAscending} sortFeedbacksDescending={sortFeedbacksDescending} filterName="createdAt" />
          </div>
          <div className="flex items-center space-x-1 text-secondaryText hover:text-mainText duration-200">
            <span className="text-sm ">State</span>
            <ButtonGroupFilter sortFeedbacksAscending={sortFeedbacksAscending} sortFeedbacksDescending={sortFeedbacksDescending} filterName="createdAt" />
          </div>
          <div className="flex items-center space-x-1 text-secondaryText hover:text-mainText duration-200">
            <span className="text-sm ">Author email</span>
            <ButtonGroupFilter sortFeedbacksAscending={sortFeedbacksAscending} sortFeedbacksDescending={sortFeedbacksDescending} filterName="createdAt" />
          </div>
      </div>
    </div>
  );
}

const ButtonGroupFilter = ({ filterName, sortFeedbacksDescending, sortFeedbacksAscending }) => {
  return (
    <div className="flex flex-col">
    <button className="ml-1" onClick={sortFeedbacksDescending} data-category={filterName}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
    <button className="ml-1" onClick={sortFeedbacksAscending} data-category={filterName}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </div>
  )
}

export const ListFeedbacks = ({
  feedbacks,
  sortFeedbacksAscending,
  sortFeedbacksDescending,
  filterStatus
}: {
  feedbacks: feedbackType[];
  sortFeedbacksAscending: (e: MouseEvent<HTMLButtonElement>) => void;
  sortFeedbacksDescending: (e: MouseEvent<HTMLButtonElement>) => void;
  filterStatus: (status: string) => void;
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
    <div className="border border-3Background hover:border-4Background bg-zinc-900 duration-200 shadow sm:rounded">
      <ListFeedbacksHeader
        filterStatus={filterStatus}
        sortFeedbacksAscending={sortFeedbacksAscending}
        sortFeedbacksDescending={sortFeedbacksDescending}
      />
      <ul className="divide-y divide-3Background bg-mainBackground">
        {feedbacksToDisplay.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </ul>
      <Pagination
        pageIndex={pageIndex}
        setpageIndex={setpageIndex}
        pageNumber={pageNumber}
        totalratings={feedbacks.length}
        nbCurrentFeedbackDisplay={feedbacksToDisplay.length}
        pageLength={pageLength}
      />
    </div>
  );
};
