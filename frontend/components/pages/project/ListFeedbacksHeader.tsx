import React, { MouseEvent } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu } from '@headlessui/react';
import { SearchFeedback } from './SearchFeedback';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ListFeedbacksHeader({
  initCheckedFeedbacks,
  setfilterSearch,
  setfilterStatus,
  filterStatus,
  filterSearch,
  feedbacksSorted,
  setfeedbacksSorted,
}) {
  const handleClickStatus = (e: MouseEvent<HTMLButtonElement>) => {
    setfilterStatus(e.currentTarget.dataset.status);
  };

  return (
    <div className="flex justify-between bg-mainBackground border-b border-3Background p-4 duration-200 shadow">
      <div className="inline-flex rounded-md divide-x divide-3Background">
        <button
          className="relative inline-flex items-center rounded-l-md bg-secondaryBackground px-2 py-2 border border-3Background focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 duration-200"
          data-status="Open"
          onClick={handleClickStatus}
        >
          <span
            className={`duration-200 hover:text-mainText text-sm font-medium ${
              filterStatus === 'Open' ? 'text-mainText' : 'text-gray-400'
            }`}
          >
            Open
          </span>
        </button>
        <button
          className="relative inline-flex items-center rounded-r-md bg-secondaryBackground px-2 py-2 border border-3Background focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-200"
          data-status="Closed"
          onClick={handleClickStatus}
        >
          <span
            className={`duration-200 hover:text-mainText text-sm font-medium ${
              filterStatus === 'Closed' ? 'text-mainText' : 'text-gray-400'
            }`}
          >
            Closed
          </span>
        </button>
      </div>
      <SearchFeedback
        initCheckedFeedbacks={initCheckedFeedbacks}
        filterSearch={filterSearch}
        setfilterSearch={setfilterSearch}
      />
      <ButtonSort feedbacksSorted={feedbacksSorted} setfeedbacksSorted={setfeedbacksSorted} />
    </div>
  );
}

export const ButtonSort = ({ feedbacksSorted, setfeedbacksSorted }) => {
  const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
    const field = e.currentTarget.dataset.field;
    let newFeedbacks = [];
    if (field === 'createdAt') {
      newFeedbacks = [...feedbacksSorted].sort((a, b) => {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        if (dateA < dateB) {
          return 1;
        }
        if (dateA > dateB) {
          return -1;
        }
        return 0;
      });
    } else {
      newFeedbacks = [...feedbacksSorted].sort((a, b) => {
        return a[field].localeCompare(b[field]);
      });
    }
    setfeedbacksSorted(newFeedbacks);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-secondaryBackground border border-3Background px-4 py-2 text-sm font-medium text-secondaryText hover:text-mainText duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <BarsArrowUpIcon className="mr-3 h-5 w-5 text-secondaryText" aria-hidden="true" />
        Sort
        <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-secondaryText" aria-hidden="true" />
      </Menu.Button>
      <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-secondaryBackground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleSort}
              className={classNames(
                active ? 'bg-3Background text-mainText' : 'text-secondaryText',
                'w-full px-4 py-2 text-sm',
              )}
              data-field="title"
            >
              Title
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleSort}
              className={classNames(
                active ? 'bg-3Background text-mainText' : 'text-secondaryText',
                'w-full px-4 py-2 text-sm',
              )}
              data-field="author_email"
            >
              Author
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleSort}
              className={classNames(
                active ? 'bg-3Background text-mainText' : 'text-secondaryText',
                'w-full px-4 py-2 text-sm',
              )}
              data-field="createdAt"
            >
              Date
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
