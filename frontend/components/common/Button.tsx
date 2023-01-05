import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Button = ({
  onClick = () => null,
  disabled = false,
  children,
  className = '',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        'duration-200 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ButtonDelete = ({
  onClick = null,
  disabled = false,
  children,
  className = '',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classNames(
        'duration-200 flex items-center justify-center rounded border border-red-600 px-4 py-2 text-sm font-medium text-red-500 hover:text-white shadow-sm disabled:bg-red-400 hover:bg-red-500 outline-none focus:ring-2 focus:ring-red-500',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
