import { Movie } from "@/app/types/movie";
import React from "react";
import MovieItem from "../Movies/MovieItem";

export default function MovieList2({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <section className="pt-20">
      <div className="relative">
        <h2 className="font-semibold mb-8 text-2xl lg:text-3xl text-slate-700 dark:text-white">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {movies.map((movie) => (
            <div key={movie._id}>
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
