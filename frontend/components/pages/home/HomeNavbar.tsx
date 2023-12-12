import React from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import img from '../../../public/images/Logo.svg'


export const HomeNavbar = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (status === 'authenticated') {
      router.push('/projects');
    } else {
      signIn({ callbackUrl: 'http://localhost:3000/projects' });
    }
  };

  return (
    <div className="flex md:flex-row md:space-y-0 space-y-2 items-center justify-between flex-col">
      <Link href="/">
        <img className="block w-8 h-8" src="'../../../public/images/Logo.svg'" alt="logo" />
      </Link>
      <div className="flex items-center space-x-2 mb-4 md:block">
        <Link href="/api/auth/signin">
          <button className="bg-indigo-500 btn hover:bg-indigo-400" onClick={handleSignup}>
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};
