import dayjs from "dayjs";
import React from "react";
import { ratingType } from "types/index";

export const TableRatingRow = ({ rating }: { rating: ratingType }) => {
  return (
    <tr className="divide-x divide-gray-200">
      <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-2">
        {dayjs(rating.createdAt).format("YYYY-MM-DD").toString()}
      </td>
      <td className="whitespace-nowrap p-2 text-sm text-gray-900">
        {rating.average}
      </td>
      <td className="whitespace-nowrap p-2 text-sm text-gray-500">
        {rating.design}
      </td>
      <td className="whitespace-nowrap p-2 text-sm text-gray-500">
        {rating.speed}
      </td>
      <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-2">
        {rating.responsive}
      </td>
    </tr>
  );
};
