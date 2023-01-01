import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { projectType } from 'types/index';
import { addProject } from '../../../services/project.service';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { SpinnerButton } from 'components/common/Spinner';

export const ProjectForm = () => {
  const { data: session } = useSession();
  const [project, setProject] = useState<Partial<projectType>>({
    name: '',
    website_url: '',
    github_url: '',
  });
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
      await addProject(session.id, project, session.jwt);
      seterror(false);
      setSuccess(true);
    } catch (error) {
      console.log(error.options);
      seterror(error.message);
      setSuccess(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center space-y-8">
      <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
        {error && <ErrorAlert message={error} />}
        {success && <SuccessAlert />}
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="name" className="block text-sm font-medium  sm:mt-px sm:pt-2">
            Project name
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <div className="flex max-w-lg rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={project.name}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="website_url" className="block text-sm font-medium  sm:mt-px sm:pt-2">
            Website url
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <div className="flex max-w-lg rounded-md shadow-sm">
              <input
                type="url"
                name="website_url"
                id="website_url"
                autoComplete="website_url"
                value={project.website_url}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="github_url" className="block text-sm font-medium  sm:mt-px sm:pt-2">
            Github url
          </label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <div className="flex max-w-lg rounded-md shadow-sm">
              <input
                type="url"
                name="github_url"
                id="github_url"
                autoComplete="github_url"
                value={project.github_url}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-indigo-400 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        disabled={loading}
      >
        {loading && <SpinnerButton />}
        Save
      </button>
    </form>
  );
};
