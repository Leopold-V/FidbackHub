import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, useEffect, useState } from 'react';
import { projectType } from 'types/index';

export function SearchProject({ projects, setprojectsFiltered }) {
  const [query, setquery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setquery(e.currentTarget.value);
  };

  useEffect(() => {
    const projectsFound = projects.filter((ele: projectType) => ele.name.toLowerCase().startsWith(query.toLowerCase()));
    setprojectsFiltered(projectsFound);
  }, [query]);

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full px-2 lg:px-6">
        <label htmlFor="search" className="sr-only">
          Search projects
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            type="search"
            className="block w-full rounded-md border border-transparent duration-200 bg-4Background bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-secondaryPrimary placeholder-muted focus:placeholder-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search projects"
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
