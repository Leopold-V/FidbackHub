import Link from 'next/link';
import React from 'react';

export const NewProjectButton = () => {
  return (
    <Link href="/project-creation">
      <a
        type="button"
        className="inline-flex mx-auto items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:w-full duration-200"
      >
        New Project
      </a>
    </Link>
  );
};
