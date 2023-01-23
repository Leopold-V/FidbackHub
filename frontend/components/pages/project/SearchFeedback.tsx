import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChangeEvent } from 'react';

export function SearchFeedback({ initCheckedFeedbacks, filterSearch, setfilterSearch }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setfilterSearch(e.currentTarget.value);
    initCheckedFeedbacks();
  };

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full px-2 lg:px-6">
        <label htmlFor="search" className="sr-only">
          Search feedback
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border border-3Background duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-secondaryBackground py-2 pl-10 pr-3 leading-5 text-secondaryPrimary placeholder-muted focus:placeholder-gray-500 outline-none sm:text-sm"
            placeholder="Search feedback"
            type="search"
            value={filterSearch}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
