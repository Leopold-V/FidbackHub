import Link from 'next/link'
import React from 'react'

export const NewProjectButton = () => {

  return (
    <div className="flex flex-col sm:flex-row xl:flex-col">
      <Link href='/project-creation'>
        <a
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 xl:w-full"
        >
          New Project
        </a>
      </Link>
    </div>
  )
}
