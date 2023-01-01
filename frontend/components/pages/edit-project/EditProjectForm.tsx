import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateProject } from '../../../services/project.service';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { projectType } from 'types/index';
import { SpinnerButton } from 'components/common/Spinner';
import dayjs from 'dayjs';
import { InputDecorators } from 'components/common/InputDecorators';

export const EditProjectForm = ({
  project,
  setProject,
}: {
  project: projectType;
  setProject: (user: projectType) => void;
}) => {
  const { data: session } = useSession();

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState<string | boolean>(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      await updateProject(project, session.jwt);
      seterror(false);
      setSuccess(true);
    } catch (error) {
      seterror(error.message);
      setSuccess(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="divide-y divide-3Background">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert />}
      <InputDecorators label="Project name">
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          value={project.name || ''}
          className="flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1 text-sm"
          onChange={handleChange}
          disabled={loading}
          placeholder="Project name"
        />
      </InputDecorators>
      <div className="text-sm flex justify-center items-center p-4">
        <span className="sm:w-1/4 w-3/4 mx-auto">Project ID</span>
        <div className="sm:w-1/2 w-3/4 flex">
          <p className="text-secondaryText font-light">{project.id}</p>
        </div>
      </div>
      <div className="text-sm flex justify-center items-center p-4">
        <span className="sm:w-1/4 w-3/4 mx-auto">Number of ratings</span>
        <div className="sm:w-1/2 w-3/4 flex">
          <p className="text-secondaryText font-light">{project.ratings.length}</p>
        </div>
      </div>
      <div className="text-sm flex justify-center items-center p-4">
        <span className="sm:w-1/4 w-3/4 mx-auto">Date created</span>
        <div className="sm:w-1/2 w-3/4 flex">
          <p className="text-secondaryText font-light">{dayjs(project.createdAt).format('YYYY-MM-DD')}</p>
        </div>
      </div>
      <div className="text-sm flex justify-center items-center p-4">
        <span className="sm:w-1/4 w-3/4 mx-auto">Last modified</span>
        <div className="sm:w-1/2 w-3/4 flex">
          <p className="text-secondaryText font-light">{dayjs(project.updatedAt).format('YYYY-MM-DD')}</p>
        </div>
      </div>
      <InputDecorators label="Website link">
        <input
          type="url"
          name="website_url"
          id="website_url"
          autoComplete="website_url"
          value={project.website_url || ''}
          className="flex-grow text-secondaryText focus:text-mainText rounded-md duration-200 border border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1 text-sm"
          onChange={handleChange}
          disabled={loading}
          placeholder="Website url"
        />
      </InputDecorators>
      <InputDecorators label="Github link">
        <input
          type="url"
          name="github_url"
          id="github_url"
          autoComplete="github_url"
          value={project.github_url || ''}
          className="flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1 text-sm"
          onChange={handleChange}
          disabled={loading}
          placeholder="Github url"
        />
      </InputDecorators>
      <div className="border-t border-3Background flex justify-center py-4">
        <button
          type="submit"
          className="duration-200 mx-auto inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading && <SpinnerButton />}
          Save
        </button>
      </div>
    </form>
  );
};
