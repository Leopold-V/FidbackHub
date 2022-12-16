import { Pagination } from 'components/common/Pagination'
import dayjs from 'dayjs'
import React from 'react'
import { ratingType } from 'types/index'

export const ListRatings = ({ ratings }: { ratings: ratingType[]}) => {
  return (
<div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr className="divide-x divide-gray-200">
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Created at
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                        Average
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Design
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Speed
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                        Responsive
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {ratings.map((rating) => (
                      <tr key={rating.id} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{dayjs(rating.createdAt).toString()}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {Math.round((rating.design + rating.speed + rating.responsive) / 3)}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{rating.design}</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{rating.speed}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{rating.responsive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
