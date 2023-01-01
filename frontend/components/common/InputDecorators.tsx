import React, { ReactNode } from 'react';

export const InputDecorators = ({ children, label }: { children: ReactNode; label: string }) => {
  return (
    <div className="text-sm flex justify-center items-center p-4">
      <label htmlFor="name" className="sm:w-1/4 w-3/4 mx-auto">
        {label}
      </label>
      <div className="sm:w-1/2 w-3/4 flex">{children}</div>
    </div>
  );
};
