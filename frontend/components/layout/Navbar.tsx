import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const navigation = [{ name: 'Projects', href: '/projects', current: true, key: 1 }];
const userNavigation = [
  { name: 'Your Profile', href: '/my-account' },
  { name: 'Sign out', href: '/api/auth/signout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-indigo-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                    alt="Avisitor logo"
                  />
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3CenterLeftIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Links section */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-end">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white duration-200"
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    <Link href={'/project-creation'} key={'999'}>
                      <div className="text-indigo-200 text-sm cursor-pointer hover:text-white px-3 py-2 border-secondaryText border rounded flex items-center space-x-1 duration-200">
                        <span>New project</span>
                        <span className="sr-only">Create new project</span>
                      </div>
                    </Link>
                    <button className="flex rounded-full p-1 text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                      <span className="sr-only">Open user notification</span>
                    </button>
                  </div>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={session?.user.image} alt="User avatar" />
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
                      <Menu.Items className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link href="/my-account">
                            <a className="w-full text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-200">
                              Your profile
                            </a>
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link href="/api/auth/signout">
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                signOut({
                                  callbackUrl: '/',
                                });
                              }}
                            >
                              Sign out
                            </button>
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <div key={item.href}>
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'text-white bg-indigo-800'
                        : 'text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600',
                      'block px-3 py-2 rounded-md text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </div>
              ))}
              <Disclosure.Button as="a" href={'/project-creation'} key={'999'}>
                <div className="text-indigo-200 cursor-pointer text-base font-medium hover:text-white px-3 py-2 flex items-center space-x-1 duration-200">
                  <span>New project</span>
                </div>
              </Disclosure.Button>
            </div>
            <div className="border-t border-indigo-800 pt-4 pb-3">
              <div className="space-y-1 px-2">
                <div className="block rounded-md px-3 py-2 text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </div>
                {userNavigation.map((item) => (
                  <div key={item.href}>
                    <Disclosure.Button
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                    >
                      {item.name}
                    </Disclosure.Button>
                  </div>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
