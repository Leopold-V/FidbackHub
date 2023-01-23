import Link from 'next/link';
import { useRouter } from 'next/router';
import { WrenchScrewdriverIcon, ChartBarIcon, HomeIcon, KeyIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

const navigation = (id: number, routeName: string) => [
  {
    name: 'Feedback list',
    href: `/project/${id}`,
    current: routeName === `/project/${id}` || routeName.match(/\?feedback=/),
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

export const Sidebar = ({ id, name }) => {
  const router = useRouter();
  return (
    <div className="flex flex-grow flex-col overflow-y-auto bg-mainBackground pt-5 pb-4 border-r border-secondaryBackground">
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-grow space-y-4 pr-6" aria-label="Sidebar">
          {navigation(id, router.asPath).map((item) => (
            <Link key={item.name} href={item.href}>
              <a
                className={classNames(
                  item.current
                    ? 'bg-main text-mainText'
                    : 'text-muted hover:bg-secondaryBackground hover:text-mainText',
                  'flex items-center px-3 py-2 rounded-r-full font-medium text-sm relative overflow-hidden duration-200',
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
