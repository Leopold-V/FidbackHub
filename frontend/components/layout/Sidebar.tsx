import Link from 'next/link';
import { useRouter } from 'next/router';
import { WrenchScrewdriverIcon, ChartBarIcon, HomeIcon, KeyIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Disclosure } from '@headlessui/react';
import { projectType } from 'types/index';

const navigation = (id: number, routeName: string) => [
  {
    name: 'Feedback list',
    href: `/project/${id}`,
    current: routeName === `/project/${id}` || routeName.match(`/project/${id}/feedback/`),
    icon: HomeIcon,
  },
  {
    name: 'Features request',
    href: `/project/${id}/features-request`,
    current: routeName === `/project/${id}/features-request`,
    icon: LightBulbIcon,
  },
  {
    name: 'Statistics',
    href: `/project/${id}/dashboard`,
    current: routeName === `/project/${id}/dashboard`,
    icon: ChartBarIcon,
  },
  {
    name: 'Settings',
    href: `/project/${id}/settings`,
    current: routeName === `/project/${id}/settings`,
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Installation',
    href: `/project/${id}/documentation`,
    current: routeName === `/project/${id}/documentation`,
    icon: KeyIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ProjectSelectItem({ listProjects }: { listProjects: projectType[]}) {
  const router = useRouter();
  const currentProject = listProjects.find((project) => project.id === +router.query.id).name;

  return (<Disclosure as="div" className="ml-3 pb-2">
    {({
      open
    }) => <>
        <Disclosure.Button className=' border-4Background hover:bg-gradient-to-r hover:border-main border w-full text-center text-muted hover:text-mainText
          flex items-center px-3 py-2 rounded font-medium text-sm relative overflow-hidden duration-200'
        >
          <span className="text-center text-base text-secondaryText w-5/6 overflow-hidden overflow-ellipsis">{currentProject}</span>
          <svg className={classNames(open ? 'text-secondaryText rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 transform transition-colors duration-200 ease-in-out group-hover:text-gray-400')} viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
          </svg>
        </Disclosure.Button>
        <Disclosure.Panel className="space-y-1">
          {listProjects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`} >
              <Disclosure.Button as="a" className="my-1 group cursor-pointer flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-muted hover:bg-secondaryBackground hover:text-mainText duration-200">
                {project.name}
              </Disclosure.Button>
        </Link>
          ))}

        </Disclosure.Panel>
      </>}
  </Disclosure>);
}

export const Sidebar = ({ id, name, listProjects }) => {

  const router = useRouter();
  return (
    <div className="flex flex-grow flex-col overflow-y-auto bg-mainBackground pt-5 pb-4 border-r border-secondaryBackground">
      <div className="mt-2 flex flex-grow flex-col">
        <nav className="flex-grow space-y-4 pr-6" aria-label="Sidebar">
          <ProjectSelectItem listProjects={Object.values(listProjects)} />
          {navigation(id, router.asPath).map((item) => (
            <Link key={item.name} href={item.href}>
              <a
                className={classNames(
                  item.current
                    ? 'bg-main text-mainText'
                    : 'text-muted hover:bg-secondaryBackground hover:text-mainText',
                  'flex items-center px-3 py-1.5 rounded-r-full font-medium text-sm relative overflow-hidden duration-200',
                )}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-mainText' : 'text-muted group-hover:text-mainText',
                    'ml-1 mr-3 flex-shrink-0 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.name}</span>
                <span
                  className={classNames(item.current ? 'visible' : 'collapse', 'text-main bg-white rounded-full p-2')}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
