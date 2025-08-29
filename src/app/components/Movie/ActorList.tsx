"use client";

import { People } from "@/app/types/actor";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import avatar_0 from "@/app/assets/avatar-0.svg";

interface ActorListProps {
  peoples: People[];
  profile_url_base: string;
}

export default function ActorList({
  peoples,
  profile_url_base,
}: ActorListProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: "auto",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla embla__actors">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {peoples.map((people) => {
            const profile_src = people.profile_path
              ? `${profile_url_base}/${people.profile_path}`
              : avatar_0;
            return (
              <div key={people.tmdb_people_id} className="embla__slide">
                <div className="py-3 px-0.5 flex flex-col items-center text-gray-800 dark:text-gray-50 dark:bg-slate-600 rounded-lg">
                  <Image
                    src={profile_src}
                    alt={people.original_name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <p className="font-semibold line-clamp-1">
                    {people.original_name}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1 mt-0.5">
                    {people.character || "N/A"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-0.5">
                    {people.known_for_department}
                  </p>
                </div>
              </div>
            );
          })}
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
  );
}
