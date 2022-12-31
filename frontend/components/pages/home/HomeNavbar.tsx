import React from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const HomeNavbar = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (status === 'authenticated') {
      router.push('/projects');
    } else {
      signIn('github', {
        callbackUrl: `/projects`,
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <img className="block w-8 h-8" src="img/logo.svg" alt="" />
      </Link>
      <div className="flex items-center mb-4 md:block">
        <Link href="/api/auth/signin">
          <button className="bg-indigo-500 btn hover:bg-indigo-400" onClick={handleSignup}>
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};
