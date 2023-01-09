import React, { FormEvent } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type InputProps = {
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  value: string;
  className?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const Input = ({
  type,
  name,
  id,
  autoComplete = '',
  value,
  className,
  onChange,
  disabled = false,
  placeholder = '',
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={autoComplete}
      value={value}
      className={classNames(
        'flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 focus:ring-2 focus:ring-indigo-500 border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none text-sm',
        className,
      )}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
