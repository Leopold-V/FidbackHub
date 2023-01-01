import React, { MouseEvent, useEffect, useState } from 'react';
import { Pagination } from 'components/common/Pagination';
import { ratingType } from 'types/index';
import { TableRatingRow } from './TableRatingRow';

function ListRatingTableHeader(props) {
  return (
    <thead className="bg-secondaryBackground">
      <tr className="divide-x divide-3Background">
        <th scope="col" className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondaryText">Date</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortRatingsDescending} data-category="createdAt">
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
              <button className="ml-2" onClick={props.sortRatingsAscending} data-category="createdAt">
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
            <span className="text-sm text-secondaryText">Avg.</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortRatingsDescending} data-category="avg">
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
              <button className="ml-2" onClick={props.sortRatingsAscending} data-category="avg">
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
            <span className="text-sm text-secondaryText">Design</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortRatingsDescending} data-category="design">
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
              <button className="ml-2" onClick={props.sortRatingsAscending} data-category="design">
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
            <span className="text-sm text-secondaryText">Speed</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortRatingsDescending} data-category="speed">
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
              <button className="ml-2" onClick={props.sortRatingsAscending} data-category="speed">
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
            <span className="text-sm text-secondaryText">Resp.</span>
            <div className="flex flex-col">
              <button className="ml-2" onClick={props.sortRatingsDescending} data-category="responsive">
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
              <button className="ml-2" onClick={props.sortRatingsAscending} data-category="responsive">
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

export const ListRatings = ({
  ratings,
  sortRatingsAscending,
  sortRatingsDescending,
}: {
  ratings: ratingType[];
  sortRatingsAscending: (e: MouseEvent<HTMLButtonElement>) => void;
  sortRatingsDescending: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const pageLength = 10;
  const pageNumber = Math.ceil(ratings.length / pageLength);

  const [ratingsToDisplay, setRatingsToDisplay] = useState(ratings.slice(0, pageLength));
  const [pageIndex, setpageIndex] = useState(0);
  const [currentPageFirstRatingsIndex, setcurrentPageFirstRatingsIndex] = useState(pageLength * pageIndex);

  useEffect(() => {
    setcurrentPageFirstRatingsIndex(pageLength * pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    setRatingsToDisplay(
      ratings.slice(currentPageFirstRatingsIndex * pageIndex, currentPageFirstRatingsIndex * pageIndex + pageLength),
    );
  }, [currentPageFirstRatingsIndex, ratings]);

  return (
    <div className="sm:px-6">
      <div className="mt-8 flex flex-col">
        <div className="sm:-mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg border border-3Background">
              <table className="min-w-full divide-y divide-3Background">
                <ListRatingTableHeader
                  sortRatingsAscending={sortRatingsAscending}
                  sortRatingsDescending={sortRatingsDescending}
                />
                <tbody className="divide-y divide-3Background bg-mainBackground">
                  {ratingsToDisplay.map((rating) => (
                    <TableRatingRow key={rating.id} rating={rating} />
                  ))}
                </tbody>
              </table>
              <Pagination
                pageIndex={pageIndex}
                setpageIndex={setpageIndex}
                pageNumber={pageNumber}
                totalratings={ratings.length}
                nbCurrentRatingsDisplay={ratingsToDisplay.length}
                pageLength={pageLength}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
