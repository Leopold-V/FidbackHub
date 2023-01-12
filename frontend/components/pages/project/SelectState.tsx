import React, { Fragment } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { feedbackStateType } from 'types/index';
import { feedbackColor } from '../../../utils/feedback';

const listState: feedbackStateType[] = ['New', 'In progress', 'Confirmed', 'Rejected'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const SelectState = ({
  selected,
  setselected,
}: {
  selected: feedbackStateType;
  setselected: (selected: feedbackStateType) => void;
}) => {
  const color = feedbackColor(selected);
  return (
    <Listbox value={selected} onChange={setselected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button
              className={`duration-200 text-xs text-${color}-800 bg-${color}-200  relative w-full cursor-default rounded-md border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:border-${color}-500 focus:outline-none focus:ring-1 focus:ring-${color}-500`}
            >
              <span>{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className={`h-5 w-5 text-${color}-400`} aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="text-xs absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-3Background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {listState.map((state, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(active ? 'bg-indigo-600' : '', 'relative cursor-default select-none py-2 pl-3 pr-9')
                    }
                    value={state}
                  >
                    {({ selected, active }) => (
                      <>
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
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
