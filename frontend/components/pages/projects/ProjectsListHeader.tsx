import React, { MouseEvent } from 'react';
import { Menu } from '@headlessui/react';
import { BarsArrowUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { SearchProject } from './SearchProject';
import dayjs from 'dayjs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProjectsListHeader = ({ projects, setprojects, setprojectsFiltered, grid, setgrid }) => {
  const handleSort = (e: MouseEvent<HTMLButtonElement>) => {
    const field = e.currentTarget.dataset.field;
    let newProjectsArray = [];
    if (field !== 'name') {
      newProjectsArray = [...projects].sort((a, b) => {
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
      newProjectsArray = [...projects].sort((a, b) => {
        return a[field].localeCompare(b[field]);
      });
    }
    console.log(projects);
    setprojects(newProjectsArray);
  };

  return (
    <div className="py-4">
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-medium pl-6">Projects</h1>
        <SearchProject projects={projects} setprojectsFiltered={setprojectsFiltered} />
        <div className="flex items-center divide-x divide-3Background">
          <button
            className={`py-1 px-2 ${
              grid ? 'text-mainText' : 'text-gray-400'
            } bg-secondaryBackground hover:text-mainText duration-200 rounded-l cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            onClick={() => setgrid(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>
          </button>
          <button
            className={`py-1 px-2 ${
              !grid ? 'text-mainText' : 'text-gray-400'
            } bg-secondaryBackground hover:text-mainText duration-200 rounded-r cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            onClick={() => setgrid(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>

        <Menu as="div" className="relative">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-secondaryBackground px-4 py-2 text-sm font-medium text-secondaryText hover:opacity-80 duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
                    active ? 'bg-3Background text-secondaryText' : 'text-secondaryText',
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
                    active ? 'bg-3Background text-secondaryText' : 'text-secondaryText',
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
                    active ? 'bg-3Background text-secondaryText' : 'text-secondaryText',
                    'w-full px-4 py-2 text-sm',
                  )}
                  data-field="createdAt"
                >
                  Date created
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};
