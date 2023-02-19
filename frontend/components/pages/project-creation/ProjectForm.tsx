import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { projectType } from 'types/index';
import { addProject } from '../../../services/project.service';
import { SpinnerButton } from 'components/common/Spinner';
import { InputDecorators } from 'components/common/InputDecorators';
import { Input } from 'components/common/Input';
export const ProjectForm = () => {
  const { data: session } = useSession();
  const [project, setProject] = useState<Partial<projectType>>({
    name: '',
    website_url: '',
    github_url: '',
  });
  const [loading, setloading] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      await addProject(session.id, project, session.jwt);
      toast.success(`Project ${project.name} created!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="divide-y divide-3Background">
      <InputDecorators label="Project name">
        <Input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          value={project.name}
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. my-ecommerce-website"
        />
      </InputDecorators>
      <InputDecorators label="Website link">
        <Input
          type="url"
          name="website_url"
          id="website_url"
          autoComplete="website_url"
          value={project.website_url}
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. https://my-ecommerce-website.com"
        />
      </InputDecorators>
      <InputDecorators label="Github link">
        <Input
          type="url"
          name="github_url"
          id="github_url"
          autoComplete="github_url"
          value={project.github_url}
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
