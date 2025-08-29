"use client";

import { Movie } from "@/app/types/movie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import MovieItem from "../Movies/MovieItem";

export default function MovieList({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="pt-20">
      <div className="relative">
        <h1 className="font-semibold mb-8 text-2xl lg:text-3xl text-slate-700 dark:text-white">
          {title}
        </h1>
        <div className="embla embla__movies">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {movies.map((movie) => (
                <div key={movie._id} className="embla__slide">
                  <MovieItem movie={movie} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Prev"
            className="embla__prev"
            onClick={scrollPrev}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="embla__next"
            onClick={scrollNext}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
