import React from 'react'

const activityItems = [
    { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
    // More items...
  ]

export const Activityfeed = () => {
  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
    <div className="pl-6 lg:w-80">
      <FeedHeader />
      <div>
        <FeedList />
        <FeedFooter />
      </div>
    </div>
  </div>
  )
}

const FeedList = () => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
    {activityItems.map((item) => (
      <li key={item.commit} className="py-4">
        <div className="flex space-x-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">You</h3>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
            <p className="text-sm text-gray-500">
              Receive new rating to project Reactirator
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
  )
}

const FeedHeader = () => {
  return (
    <div className="pt-6 pb-2">
        <h2 className="text-sm font-semibold">Activity</h2>
      </div>
  )
}

const FeedFooter = () => {
  return (
  <div className="border-t border-gray-200 py-4 text-sm">
    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-900">
      View all activity
      <span aria-hidden="true"> &rarr;</span>
    </a>
  </div>
  )
}

