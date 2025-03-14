export default function MovieListSkeleton() {
  return (
    <section className="pt-20">
      <div className="relative">
        <div className="animate-pulse h-8 w-72 bg-slate-700 mb-8 rounded-lg"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
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
