import React from 'react'

export const HeaderWrapper = ({ children }) => {
  return (
    <div className="bg-mainBackground py-4 px-6 border-b border-secondaryBackground w-full">
        {children}
    </div>
  )
}
