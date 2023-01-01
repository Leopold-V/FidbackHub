import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { projectType } from 'types/index';
import { addProject } from '../../../services/project.service';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { SpinnerButton } from 'components/common/Spinner';
import { InputDecorators } from 'components/common/InputDecorators';

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
    <form onSubmit={handleSubmit} className="divide-y divide-3Background">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert />}
      <InputDecorators label="Project name">
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          value={project.name}
          className="flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1 text-sm"
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. my-ecommerce-website"
        />
      </InputDecorators>
      <InputDecorators label="Website link">
        <input
          type="url"
          name="website_url"
          id="website_url"
          autoComplete="website_url"
          value={project.website_url}
          className="flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1 text-sm"
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. https://my-ecommerce-website.com"
        />
      </InputDecorators>
      <InputDecorators label="Github link">
        <input
          type="url"
          name="github_url"
          id="github_url"
          autoComplete="github_url"
          value={project.github_url}
          className="flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 border-3Background bg-secondaryBackground bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none focus:ring-1 text-sm"
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. https://github.com/your-username/my-ecommerce-website"
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
