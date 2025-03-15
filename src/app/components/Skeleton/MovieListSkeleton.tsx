"use client";

interface MovieListSkeletonProps {
  length: number;
  smLength?: number;
  mdLength?: number;
  lgLength?: number;
}

export default function MovieListSkeleton(props: MovieListSkeletonProps) {
  const { length, smLength, mdLength, lgLength } = props;

  return (
    <section className="pt-20">
      <div className="relative">
        <div className="animate-pulse h-8 w-72 bg-slate-700 mb-8 rounded-lg"></div>
        <div className="grid grid-cols-2 sm:hidden gap-4">
          {Array.from({ length: length }).map((_, index) => (
            <div key={index}>
              <div className="animate-pulse h-80 bg-slate-700 mb-3 rounded-lg"></div>
              <div className="animate-pulse h-5 bg-slate-700 mb-2 rounded-lg"></div>
              <div className="animate-pulse h-5 w-3/5 bg-slate-700 rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-3 md:hidden gap-4">
          {Array.from({ length: smLength || length }).map((_, index) => (
            <div key={index}>
              <div className="animate-pulse h-80 bg-slate-700 mb-3 rounded-lg"></div>
              <div className="animate-pulse h-5 bg-slate-700 mb-2 rounded-lg"></div>
              <div className="animate-pulse h-5 w-3/5 bg-slate-700 rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="hidden md:grid grid-cols-4 lg:hidden gap-4">
          {Array.from({ length: mdLength || length }).map((_, index) => (
            <div key={index}>
              <div className="animate-pulse h-80 bg-slate-700 mb-3 rounded-lg"></div>
              <div className="animate-pulse h-5 bg-slate-700 mb-2 rounded-lg"></div>
              <div className="animate-pulse h-5 w-3/5 bg-slate-700 rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid grid-cols-5 gap-4">
          {Array.from({ length: lgLength || length }).map((_, index) => (
            <div key={index}>
              <div className="animate-pulse h-80 bg-slate-700 mb-3 rounded-lg"></div>
              <div className="animate-pulse h-5 bg-slate-700 mb-2 rounded-lg"></div>
              <div className="animate-pulse h-5 w-3/5 bg-slate-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
