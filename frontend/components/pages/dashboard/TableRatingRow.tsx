import dayjs from 'dayjs'
import React from 'react'
import { ratingType } from 'types/index'

export const TableRatingRow = ({ rating }: {rating: ratingType }) => {
  return (
    <tr className="divide-x divide-gray-200">
    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{dayjs(rating.createdAt).format('YYYY-MM-DD').toString()}</td>
    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
      {Math.round((rating.design + rating.speed + rating.responsive) / 3)}
    </td>
    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{rating.design}</td>
    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{rating.speed}</td>
    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{rating.responsive}</td>
  </tr>
  )
}
