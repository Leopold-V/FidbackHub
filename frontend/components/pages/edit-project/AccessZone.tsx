import React from 'react';
import SecretKey from './SecretKey';

export const AccessZone = ({ api_key }: { api_key: string }) => {
  return (
    <>
      <SecretKey label={'Project token'} value={api_key} />
      <div className="text-sm flex justify-center items-center p-4">
        <span className="sm:w-1/4 w-3/4 mx-auto">Members</span>
        <div className="sm:w-1/2 w-3/4 flex">
          <p className="text-secondaryText font-light">To be defined</p>
        </div>
      </div>
    </>
  );
};
