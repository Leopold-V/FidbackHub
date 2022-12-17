import React, { useEffect, useState } from 'react'
import { Pagination } from 'components/common/Pagination'
import dayjs from 'dayjs'
import { ratingType } from 'types/index'
import { TableRatingRow } from './TableRatingRow'

export const ListRatings = ({ ratings }: { ratings: ratingType[]}) => {
  const pageLength = 10;
  const pageNumber = Math.ceil(ratings.length / pageLength)

  const [ratingsToDisplay , setRatingsToDisplay] = useState(ratings.slice(0, pageLength));
  const [pageIndex, setpageIndex] = useState(0);
  const [currentPageFirstRatingsIndex, setcurrentPageFirstRatingsIndex] = useState(pageLength * pageIndex);

  useEffect(() => {
    setcurrentPageFirstRatingsIndex(pageLength * pageIndex);
  }, [pageIndex])

  useEffect(() => {
    setRatingsToDisplay(ratings.slice(currentPageFirstRatingsIndex * pageIndex, currentPageFirstRatingsIndex * pageIndex + pageLength));
  }, [currentPageFirstRatingsIndex])

  return (
      <div className="sm:px-6">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 sm:-mx-6">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr className="divide-x divide-gray-200">
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Date
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                        Avg.
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Design
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Speed
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                        Resp.
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {ratingsToDisplay.map((rating) => (
                      <TableRatingRow key={rating.id} rating={rating} />
                    ))}
                  </tbody>
                </table>
                <Pagination pageIndex={pageIndex} setpageIndex={setpageIndex} pageNumber={pageNumber} totalratings={ratings.length} nbCurrentRatingsDisplay={ratingsToDisplay.length} pageLength={pageLength} />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
