import React from 'react';
import { Hero } from './Hero';
import { HomeNavbar } from './HomeNavbar';

const HomePageComponent = () => {
  return (
    <div className="text-gray-400 bg-black min-h-screen md:px-10 px-4 py-6">
      <div className="absolute inset-0 bg-top bg-no-repeat bg-illustration-01"></div>
      <div className="relative">
        <HomeNavbar />
        <Hero />
      </div>
    </div>
  );
};

export default HomePageComponent;
