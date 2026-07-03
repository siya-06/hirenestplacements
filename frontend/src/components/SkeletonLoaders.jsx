import React from 'react';

export const SkeletonJobCard = () => {
  return (
    <div className="bg-surface p-6 rounded-xl border border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-pulse">
      <div className="flex items-center gap-6 w-full">
        <div className="w-14 h-14 rounded-lg bg-surface-variant shrink-0"></div>
        <div className="space-y-3 w-full">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-surface-variant w-16 rounded-md"></div>
            <div className="h-4 bg-surface-variant w-24 rounded-md"></div>
          </div>
          <div className="h-6 bg-surface-variant w-2/3 rounded-md"></div>
          <div className="h-4 bg-surface-variant w-1/2 rounded-md"></div>
        </div>
      </div>
      <div className="h-10 bg-surface-variant w-28 rounded-full shrink-0 self-start md:self-auto"></div>
    </div>
  );
};

export const SkeletonJobDetails = () => {
  return (
    <div className="max-w-container-max mx-auto py-12 px-8 space-y-8 animate-pulse">
      <div className="h-6 bg-surface-variant w-24 rounded-md"></div>
      <div className="space-y-4">
        <div className="h-10 bg-surface-variant w-1/2 rounded-md"></div>
        <div className="h-5 bg-surface-variant w-1/4 rounded-md"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <div className="h-6 bg-surface-variant w-1/4 rounded-md"></div>
            <div className="h-4 bg-surface-variant w-full rounded-md"></div>
            <div className="h-4 bg-surface-variant w-5/6 rounded-md"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-surface-variant w-1/3 rounded-md"></div>
            <div className="space-y-2">
              <div className="h-4 bg-surface-variant w-full rounded-md"></div>
              <div className="h-4 bg-surface-variant w-full rounded-md"></div>
              <div className="h-4 bg-surface-variant w-4/5 rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 bg-surface-variant h-64 rounded-2xl"></div>
      </div>
    </div>
  );
};
