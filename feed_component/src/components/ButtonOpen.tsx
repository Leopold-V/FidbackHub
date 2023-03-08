import React from 'react';

type ButtonOpenProps = {
  open: boolean;
  setopen: (open: boolean) => void;
};

export const ButtonOpen = ({ open, setopen }: ButtonOpenProps) => {
  const handleClick = () => {
    //@ts-ignore
    setopen((open: boolean) => !open);
  };

  return (
    <button
      className={`bg-indigo-600 text-white rounded-t w-96
    h-12 flex items-center justify-center relative`}
      onClick={handleClick}
    >
      <h1 className="text-center py-3">Feedback</h1>
      {open && (
        <span className="absolute top-2 left-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      )}
    </button>
  );
};
