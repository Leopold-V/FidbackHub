import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { updateProject } from '../../../services/project.service';
import { projectType } from 'types/index';
import { SpinnerButton } from 'components/common/Spinner';
import { InputDecorators } from 'components/common/InputDecorators';
import { Input } from 'components/common/Input';

export const EditProjectForm = ({
  project,
  setProject,
}: {
  project: projectType;
  setProject: (user: projectType) => void;
}) => {
  const { data: session } = useSession();
  const [input, setInput] = useState({
    name: project.name,
    website_url: project.website_url,
    github_url: project.github_url,
  });
  const [loading, setloading] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    console.log({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      await updateProject({ ...project, ...input }, session.jwt);
      setProject({ ...project, ...input });
      toast.success(`Project ${project.name} updated!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded p-1 divide-y divide-3Background"
    >
      <InputDecorators label="Project name">
        <Input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          value={input.name}
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
        <span className="sm:w-1/4 w-3/4 mx-auto">Number of feedbacks</span>
        <div className="sm:w-1/2 w-3/4 flex">
          <p className="text-secondaryText font-light">{project.feedbacks.length}</p>
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
        <Input
          type="url"
          name="website_url"
          id="website_url"
          autoComplete="website_url"
          value={input.website_url}
          onChange={handleChange}
          disabled={loading}
          placeholder="Website url"
        />
      </InputDecorators>
      <InputDecorators label="Github link">
        <Input
          type="url"
          name="github_url"
          id="github_url"
          autoComplete="github_url"
          value={input.github_url}
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
