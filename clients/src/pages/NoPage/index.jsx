import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-neutral-500 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block text-sm rounded-full px-4 py-[5px] border dark:border-neutral-200 border-neutral-950 dark:text-neutral-50 bg-white dark:bg-neutral-950 text-neutral-950 hover:dark:text-black hover:dark:bg-neutral-200 hover:dark:shadow-[0_0_25px_2px_rgba(255,255,255,0.7)] hover:text-neutral-100 hover:shadow-[0_0_25px_2px_rgba(0,0,0,0.7)] hover:bg-neutral-950 transition-all duration-500 ease-in-out"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NoPage;