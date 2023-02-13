import React, { useState, MouseEvent } from 'react';
import { Input } from 'components/common/Input';
import SecretKey from './SecretKey';
import { ButtonOutline } from 'components/common/Button';
import { SpinnerButton } from 'components/common/Spinner';
import { UsersIcon } from '@heroicons/react/20/solid';
import { projectType } from 'types/index';

const MembersList = ({ membersList, setmembers }) => {
  const handleRemoveMember = (e: MouseEvent<HTMLButtonElement>) => {
    const member_email = e.currentTarget.dataset.email;
    setmembers((members) => members.filter((member) => member.email !== member_email));
  };

  return (
    <ul className="px-3 py-3 text-muted divide-3Background divide-y h-40 overflow-auto scroll-auto">
      {membersList.map((member) => (
        <li key={member.email} className="py-2 flex items-center justify-between">
          <span className="hover:text-indigo-500 duration-200 w-52 overflow-hidden overflow-ellipsis">{member.email}</span>
          <button
            onClick={handleRemoveMember}
            data-email={member.email}
            className="text-secondaryText relative inline-flex items-center rounded-full bg-secondaryBackground border border-3Background px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export const AccessZone = ({ project }: { project: projectType }) => {
  const [members, setmembers] = useState(project.members.map((ele) => ({ email: ele.email })));
  const [member, setmember] = useState('');
  const [loading, setloading] = useState(false);

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('TODO: request to search the user');
    setmembers((members) => [...members, { email: member }]);
  };

  const handleChange = (e: MouseEvent<HTMLInputElement>) => {
    setmember(e.currentTarget.value);
  };

  const handleSave = () => {
    console.log('TODO: save project update with new guest lists.');
  };

  return (
    <>
      <SecretKey label={'Project token'} value={project.api_key} />
      <div className="text-sm flex flex-col sm:flex-row justify-center p-4">
        <label htmlFor="member_email" className="sm:w-1/4 mx-auto sm:pb-0 pb-4">
          Members
        </label>
        <div className="flex justify-center">
          <div>
            <div className="relative flex">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-secondaryText">
                <UsersIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <Input
                type="mail"
                name="member_email"
                id="member_email"
                value={member}
                className="pl-10 rounded-r-none"
                placeholder="User email"
                onChange={handleChange}
              />
              <button
                onClick={handleAdd}
                className="relative inline-flex items-center rounded-r bg-secondaryBackground px-3 py-2 border border-l-0 border-3Background focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 duration-200"
              >
                Add
              </button>
            </div>
            {members.length > 0 && <MembersList membersList={members} setmembers={setmembers} />}
          </div>
        </div>
      </div>
      <div className="border-t border-3Background flex justify-center py-4">
        <ButtonOutline
          type="submit"
          onClick={handleSave}
        >
          {loading && <SpinnerButton />}
          Save
        </ButtonOutline>
      </div>
    </>
  );
};
