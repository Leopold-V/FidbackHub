import Link from 'next/link';
import React from 'react';

export const Hero = () => {
  return (
    <>
      <h1 className="px-8 mt-16 mb-6 text-5xl font-extrabold leading-tight text-center text-white xl:text-6xl">
        Discover <span className="text-indigo-700">FidbackHub</span>
      </h1>
      <p className="max-w-xl mx-auto mb-10 text-xl text-center xl:max-w-2xl">
        A simple way to recolt feedbacks on your website design and performance. Ask to the users!
      </p>
      <div className="flex flex-col justify-center max-w-xs mx-auto mb-12 sm:max-w-full sm:flex-row">
        <Link href="/documentation">
          <a
            className="w-full mb-4 whitespace-no-wrap bg-indigo-500 btn btn-tall md:w-auto hover:bg-indigo-400 sm:mr-2"
            href="/documentation"
          >
            Get started
          </a>
        </Link>
        <Link href="https://github.com/">
          <a className="w-full mb-4 whitespace-no-wrap bg-gray-800 btn btn-tall md:w-auto hover:bg-gray-600 sm:ml-2">
            View on Github
          </a>
        </Link>
      </div>
    </>
  );
};
