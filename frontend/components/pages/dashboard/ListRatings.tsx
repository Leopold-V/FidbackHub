import React, { MouseEvent, useEffect, useState } from 'react';
import { Pagination } from 'components/common/Pagination';
import dayjs from 'dayjs';
import { ratingType } from 'types/index';
import { TableRatingRow } from './TableRatingRow';

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
        <div className="-my-2 sm:-mx-6">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr className="divide-x divide-gray-200">
                    <th scope="col" className="p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900">Date</span>
                        <div className="flex flex-col">
                          <button className="ml-2" onClick={sortRatingsDescending} data-category="createdAt">
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
                          <button className="ml-2" onClick={sortRatingsAscending} data-category="createdAt">
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
                        <span className="text-sm font-semibold text-gray-900">Avg.</span>
                        <div className="flex flex-col">
                          <button className="ml-2" onClick={sortRatingsDescending} data-category="avg">
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
                          <button className="ml-2" onClick={sortRatingsAscending} data-category="avg">
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
                        <span className="text-sm font-semibold text-gray-900">Design</span>
                        <div className="flex flex-col">
                          <button className="ml-2" onClick={sortRatingsDescending} data-category="design">
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
                          <button className="ml-2" onClick={sortRatingsAscending} data-category="design">
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
                        <span className="text-sm font-semibold text-gray-900">Speed</span>
                        <div className="flex flex-col">
                          <button className="ml-2" onClick={sortRatingsDescending} data-category="speed">
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
                          <button className="ml-2" onClick={sortRatingsAscending} data-category="speed">
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
                        <span className="text-sm font-semibold text-gray-900">Resp.</span>
                        <div className="flex flex-col">
                          <button className="ml-2" onClick={sortRatingsDescending} data-category="responsive">
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
                          <button className="ml-2" onClick={sortRatingsAscending} data-category="responsive">
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
                <tbody className="divide-y divide-gray-200 bg-white">
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
