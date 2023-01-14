import React, { Fragment } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { feedbackStateType } from 'types/index';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const SelectState = ({
  selected,
  setselected,
  listItems
}: {
  selected: feedbackStateType;
  setselected: (selected: feedbackStateType) => void;
  listItems: string[]
}) => {
  return (
    <Listbox value={selected} onChange={setselected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className={`duration-200 w-40 text-xs bg-secondaryBackground relative cursor-default rounded-md border border-3Background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          >
            <span>{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className={`h-5 w-5 `} aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="text-xs absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-3Background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {listItems.map((state, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    classNames(active ? 'bg-indigo-600' : '', 'relative cursor-default select-none py-2 pl-3 pr-9')
                  }
                  value={state}
                >
                  {({ selected, active }) => (
                    <div className="flex space-x-2">
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {state}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
