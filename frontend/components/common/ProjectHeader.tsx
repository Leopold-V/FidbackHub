import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonBack } from './Button';

const tabs = (id: number, routeName: string) => [
  {
    name: 'Feedback list',
    href: `/project/${id}`,
    current: routeName === `/project/${id}` || routeName.match(/\?feedback=/),
  },
  {
    name: 'Features request',
    href: `/project/${id}/features-request`,
    current: routeName === `/project/${id}/features-request`,
  },
  { name: 'Statistics', href: `/project/${id}/dashboard`, current: routeName === `/project/${id}/dashboard` },
  { name: 'Settings', href: `/project/${id}/settings`, current: routeName === `/project/${id}/settings` },
  { name: 'Installation', href: `/project/${id}/documentation`, current: routeName === `/project/${id}/documentation` },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProjectHeader = ({ id, name }) => {
  const router = useRouter();

  return (
    <div className="w-full bg-stone-900 border-b pt-4 border-3Background">
      <div className="w-full grid grid-cols-3 space-x-4">
        <div className="space-x-4 flex items-center ml-2">
          <ButtonBack link="/projects" label={name} />
        </div>
        <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
          {tabs(id, router.asPath).map((tab) => (
            <Link href={tab.href} key={tab.name}>
              <a
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-500'
                    : 'border-transparent hover:border-mainText text-secondaryText hover:text-mainText',
                  'duration-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium sm:text-base text-sm',
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
