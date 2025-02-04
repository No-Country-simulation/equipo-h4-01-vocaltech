'use client';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingSkeleton = () => {
  return (
    <div className="border-2 border-accent border-opacity-20 rounded-xl p-6 m-4 lg:p-8 lg:m-8 overflow-hidden animate-pulse">
      {/* Tabs Navigation Skeleton */}
      <div className="flex gap-4 mb-8">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-10 w-24 rounded-lg bg-muted" />
        ))}
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-6 w-48 bg-muted" />
        <Skeleton className="h-6 w-24 bg-muted" />
      </div>

      {/* Main Content Skeleton */}
      <div className="space-y-8">
        {/* Section Title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-muted" />
          <Skeleton className="h-[1px] w-full bg-muted" />
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-48 bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" />
            </div>
          ))}
        </div>

        {/* Progress and Buttons */}
        <div className="flex justify-between mt-8">
          <Skeleton className="h-10 w-24 bg-muted" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24 bg-muted" />
            <Skeleton className="h-10 w-24 bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
