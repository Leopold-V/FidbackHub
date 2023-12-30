import React from 'react';

export const SuccessPage = () => {
  return (
    <div id="layout" className="relative bg-gray-50 h-full">
      <div className="flex items-center h-full w-full px-8 py-4">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="font-bold text-2xl text-indigo-500 leading-4 py-6">
            Your feedback has been created successfully !
          </h1>
          <div className="w-1/3">
            <img src="../public/undraw_well_done.svg" alt="well_done" />
          </div>
        </div>
      </div>
    </div>
  );
};
