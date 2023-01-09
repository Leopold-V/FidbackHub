import Link from 'next/link';
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

/**
 * How this component works ?
 * The component is wrapped by a next/Link component.
 * The "link" prop is the value to give to the href attribute of the Link component.
 */
export const ButtonBack = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <a className="duration-200 flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-sm text-secondaryText shadow-sm hover:text-indigo-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
        <span className="ml-1">Back</span>
      </a>
    </Link>
  );
};
