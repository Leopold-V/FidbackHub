import React, { MouseEvent } from 'react';
import dayjs from 'dayjs';

export const DateButtonGroups = ({ setdateRange }) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newDateRange = {
      startDate: e.currentTarget.dataset.date,
      endDate: dayjs(new Date()).format('YYYY-MM-DD'),
    };
    setdateRange(newDateRange);
  };

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center rounded-l-md border border-4Background bg-secondaryBackground px-4 py-2 text-sm text-secondaryText hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        data-date={dayjs().subtract(7, 'day').format('YYYY-MM-DD')}
        onClick={handleClick}
      >
        7D
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-4Background bg-secondaryBackground px-4 py-2 text-sm  text-secondaryText hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        data-date={dayjs().subtract(30, 'day').format('YYYY-MM-DD')}
        onClick={handleClick}
      >
        30D
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-4Background bg-secondaryBackground px-4 py-2 text-sm  text-secondaryText hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        data-date={dayjs().subtract(3, 'month').format('YYYY-MM-DD')}
        onClick={handleClick}
      >
        3M
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center border border-4Background bg-secondaryBackground px-4 py-2 text-sm  text-secondaryText hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        data-date={dayjs().subtract(6, 'month').format('YYYY-MM-DD')}
        onClick={handleClick}
      >
        6M
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex rounded-r-md items-center border border-4Background bg-secondaryBackground px-4 py-2 text-sm  text-secondaryText hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        data-date={dayjs().subtract(12, 'month').format('YYYY-MM-DD')}
        onClick={handleClick}
      >
        12M
      </button>
    </span>
  );
};
