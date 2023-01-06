import Link from 'next/link';
import { useRouter } from 'next/router';

const tabs = (id: number, routeName) => ([
    { name: 'Overview', href: `/project/${id}`, current: routeName === `/project/${id}` },
    { name: 'Dashboard', href: `/project/${id}/dashboard`, current: routeName === `/project/${id}/dashboard` },
    { name: 'Settings', href: `/project/${id}/settings`, current: routeName === `/project/${id}/settings` },
  ])
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export const ProjectHeader = ({ id }) => {
    const router = useRouter();

    return (
        <div className="w-full bg-stone-900 border-b pt-4 border-3Background">
        <div className="text-center sm:text-left sm:w-3/4 mx-auto">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-3Background py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs(id, router.asPath).find((tab) => tab.current).name}
          >
            {tabs(id, router.asPath).map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs(id, router.asPath).map((tab) => (
                <Link href={tab.href}>
                  <a
                    key={tab.name}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-500'
                        : 'border-transparent hover:border-mainText text-secondaryText hover:text-mainText',
                      'duration-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium'
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
      </div>
    </div>
    )
  }