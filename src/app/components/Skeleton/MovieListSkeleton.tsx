import { Suspense } from "react";
import Filter from "../Movies/Filter";

export default function MovieListSkeleton({ length }: { length: number }) {
  return (
    <section>
      {/* Breadcrumb */}
      <div className="h-[57px] flex items-center border-b border-slate-900/10 dark:border-slate-50/6">
        <div className="animate-pulse h-6 w-64 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
      </div>
      <div className="mt-2 py-2 w-full">
        {/* Movie Category */}
        <div className="animate-pulse h-8 w-28 bg-slate-300 dark:bg-slate-700 mb-4 rounded-lg"></div>
        <Suspense>
          <Filter defaultSortField="modified.time" type="type" />
        </Suspense>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 py-5">
          {Array.from({ length: length }).map((_, index) => (
            <div key={index}>
              <div className="animate-pulse h-80 bg-slate-300 dark:bg-slate-700 mb-3 rounded-lg"></div>
              <div className="animate-pulse h-5 bg-slate-300 dark:bg-slate-700 mb-2 rounded-lg"></div>
              <div className="animate-pulse h-5 w-3/5 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
