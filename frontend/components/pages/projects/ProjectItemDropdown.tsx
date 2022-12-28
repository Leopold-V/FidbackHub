import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { projectType } from 'types/index';
import { deleteProject } from '../../../services/project.service';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProjectItemDropdown = ({
  projectId,
  projects,
  setprojects,
}: {
  projectId: number;
  projects: projectType[];
  setprojects: (project: projectType[]) => void;
}) => {
  const { data: session } = useSession();

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId, session.jwt);
      const newProjectsList = [...projects].filter((ele) => ele.id !== projectId);
      setprojects([...newProjectsList]);
    } catch (error) {
      // TODO: trigger an alert with the error message
      console.log(error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700')}>
                  <Link href={`/dashboard/${projectId}`}>
                    <a className={classNames('block px-4 py-2 text-sm')}>Open</a>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700')}>
                  <Link href={`/edit-project/${projectId}`}>
                    <a className={classNames('block px-4 py-2 text-sm')}>Settings</a>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700')}>
                  <button className={classNames('px-4 py-2 text-sm w-full text-left')} onClick={handleDeleteProject}>
                    Delete
                  </button>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
