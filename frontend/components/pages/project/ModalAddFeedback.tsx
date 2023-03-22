import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { createFeedback } from '../../../services/feedback.service';
import { useSession } from 'next-auth/react';
import { feedbackType, feedbackTypeType } from 'types/index';
import { toast } from 'react-toastify';
import { Button } from 'components/common/Button';
import { InputDecorators } from 'components/common/InputDecorators';
import { Input } from 'components/common/Input';
import { SelectState } from 'components/common/SelectState';

const listType: feedbackTypeType[] = ['Bug report', 'Feature request', 'General feedback'];

export const ModalAddFeedback = ({ open, setopen, projectToken, setData }) => {
  const { data: session } = useSession();
  const [selectedType, setSelectedType] = useState<feedbackTypeType>('Bug report');
  const [feedback, setfeedback] = useState<Partial<feedbackType>>({
    title: '',
    description: '',
    author_email: session.user.email,
    type: selectedType,
  });
  const cancelButtonRef = useRef(null);

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setfeedback({ ...feedback, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleCreateFeedback = async () => {
    try {
      const result = await createFeedback({ ...feedback, type: selectedType }, projectToken);
      setData((data) => [...data, result.data.attributes]);
      toast.success('New Feedback added!');
      setopen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setopen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-mainText">
                        New Feedback
                      </Dialog.Title>
                      <div className="mt-2 text-secondaryText">
                        <InputDecorators label="Title">
                          <Input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="title"
                            value={feedback.title}
                            onChange={handleChange}
                            placeholder="title"
                          />
                        </InputDecorators>
                        <div className="text-sm flex justify-center items-center p-4">
                          <label htmlFor="name" className="sm:w-1/4 w-3/4 mx-auto">
                            Type
                          </label>
                          <div className="sm:w-1/2 w-3/4 flex">
                            <SelectState selected={selectedType} setselected={setSelectedType} listItems={listType} />
                          </div>
                        </div>
                        <InputDecorators label="description">
                          <textarea
                            name="description"
                            id="description"
                            autoComplete="description"
                            className="flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 focus:ring-2 focus:ring-indigo-500 border-3Background bg-3Background bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none text-sm"
                            value={feedback.description}
                            onChange={handleChange}
                            placeholder="description"
                          />
                        </InputDecorators>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-mainBackground px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button type="button" onClick={handleCreateFeedback}>
                    Create
                  </Button>
                  <button
                    type="button"
                    className="mt-3 mr-4 justify-center rounded-md border border-4Background bg-3Background px-4 py-2 text-secondaryText shadow-sm hover:bg-secondaryBackground hover:text-indigo-500 duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto text-sm"
                    onClick={() => setopen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
