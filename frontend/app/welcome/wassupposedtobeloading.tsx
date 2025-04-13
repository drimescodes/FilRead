// pages/welcome/loading.tsx
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="pt-10 pb-8">
      <div className="flex items-center justify-between mb-8 px-4">
        <h1 className="text-2xl font-bold">Welcome back ...</h1>
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="border-b-2 border-readreblack-4 flex-1"></div>
        <p className="sm:px-10 text-center sm:text-3xl text-xl font-bold flex-nowrap">Featured Posts</p>
        <div className="border-b-2 border-readreblack-4 flex-1"></div>
      </div>

      <section className="pt-6 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-6">
        {/* Simulating multiple skeleton blog cards */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse w-full">
            <div className="bg-gray-300 h-40 w-full rounded-md mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LoadingSkeleton;
