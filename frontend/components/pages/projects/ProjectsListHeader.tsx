import React, { MouseEvent } from 'react';
import { Menu } from '@headlessui/react';
import { BarsArrowUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProjectsListHeader = ({ projects, setprojects }) => {
  const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
    const field = e.currentTarget.dataset.field;
    const newProjectsArray = [...projects].sort((a, b) => {
      const nameA = a[field].toString().toLowerCase(); // ignore upper and lowercase
      const nameB = b[field].toString().toLowerCase(); // ignore upper and lowercase
      console.log(nameA, nameB);
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setprojects(newProjectsArray);
  };

  return (
    <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
      <div className="flex items-center">
        <h1 className="flex-1 text-lg font-medium">Projects</h1>
        <Menu as="div" className="relative">
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <BarsArrowUpIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Sort
            <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSort}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full px-4 py-2 text-sm',
                    )}
                    data-field="name"
                  >
                    Name
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSort}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full px-4 py-2 text-sm',
                    )}
                    data-field="updatedAt"
                  >
                    Date modified
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleSort}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full px-4 py-2 text-sm',
                    )}
                    data-field="createdAt"
                  >
                    Date created
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};
