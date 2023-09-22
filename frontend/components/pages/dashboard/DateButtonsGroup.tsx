import React, { useState, MouseEvent } from 'react';
import dayjs from 'dayjs';

export const DateButtonGroups = ({ setdateRange, firstDate }) => {
  const [activeBtn, setactiveBtn] = useState('');
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setactiveBtn(e.currentTarget.name);
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
        className={`${
          'ALL' === activeBtn ? 'text-indigo-500' : 'text-secondaryText'
        } py-1.5 relative -ml-px inline-flex rounded-l-md items-center border border-3Background bg-secondaryBackground px-4 text-sm  hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        data-date={dayjs(firstDate).format('YYYY-MM-DD')}
        name="ALL"
        onClick={handleClick}
      >
        ALL
      </button>
      <button
        type="button"
        className={`${
          '7D' === activeBtn ? 'text-indigo-500' : 'text-secondaryText'
        } relative -ml-px inline-flex items-center border border-3Background bg-secondaryBackground px-4 text-sm  hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        data-date={dayjs().subtract(7, 'day').format('YYYY-MM-DD')}
        name="7D"
        onClick={handleClick}
      >
        7D
      </button>
      <button
        type="button"
        className={`${
          '1M' === activeBtn ? 'text-indigo-500' : 'text-secondaryText'
        } relative -ml-px inline-flex items-center border border-3Background bg-secondaryBackground px-4 text-sm  hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        data-date={dayjs().subtract(1, 'month').format('YYYY-MM-DD')}
        name="1M"
        onClick={handleClick}
      >
        1M
      </button>
      <button
        type="button"
        className={`${
          '3M' === activeBtn ? 'text-indigo-500' : 'text-secondaryText'
        } relative -ml-px inline-flex items-center border border-3Background bg-secondaryBackground px-4 text-sm  hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        data-date={dayjs().subtract(3, 'month').format('YYYY-MM-DD')}
        name="3M"
        onClick={handleClick}
      >
        3M
      </button>
      <button
        type="button"
        className={`${
          '6M' === activeBtn ? 'text-indigo-500' : 'text-secondaryText'
        } relative -ml-px inline-flex items-center border border-3Background bg-secondaryBackground px-4 text-sm  hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        data-date={dayjs().subtract(6, 'month').format('YYYY-MM-DD')}
        name="6M"
        onClick={handleClick}
      >
        6M
      </button>
      <button
        type="button"
        className={`${
          '1Y' === activeBtn ? 'text-indigo-500' : 'text-secondaryText'
        } rounded-r-md relative -ml-px inline-flex items-center border border-3Background bg-secondaryBackground px-4 text-sm  hover:text-indigo-500 duration-150 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        data-date={dayjs().subtract(1, 'year').format('YYYY-MM-DD')}
        name="1Y"
        onClick={handleClick}
      >
        1Y
      </button>
    </span>
  );
};
