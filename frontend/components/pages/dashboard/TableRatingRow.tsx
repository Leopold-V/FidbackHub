import dayjs from 'dayjs';
import React from 'react';
import { ratingType } from 'types/index';

export const TableRatingRow = ({ rating }: { rating: ratingType }) => {
  return (
    <tr className="divide-x divide-3Background bg-mainBackground border-4Background hover:bg-secondaryBackground duration-150 text-secondaryText">
      <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm  sm:pr-2">
        {dayjs(rating.createdAt).format('YYYY-MM-DD').toString()}
      </td>
      <td className="whitespace-nowrap p-2 text-sm ">{rating.average}</td>
      <td className="whitespace-nowrap p-2 text-sm ">{rating.design}</td>
      <td className="whitespace-nowrap p-2 text-sm ">{rating.speed}</td>
      <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm sm:pr-2">{rating.responsive}</td>
    </tr>
  );
};
