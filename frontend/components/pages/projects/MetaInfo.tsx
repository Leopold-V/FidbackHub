import React from 'react'
import {
    RectangleStackIcon,
  } from '@heroicons/react/20/solid'

export const MetaInfo = () => {
  return (
  <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
    <div className="flex items-center space-x-2">
      <RectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      <span className="text-sm font-medium text-gray-500">8 Projects</span>
    </div>
  </div>
  )
}
