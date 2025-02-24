"use client";

import { Movie } from "@/app/types/movie";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const locale = useLocale();

  return (
    <section>
      <Swiper slidesPerView={2}>
        {movies.map((movie) => (
          <SwiperSlide key={movie._id} className="rounded-lg">
            <Image
              src={`https://img.ophim.live/${movie.thumb_url}`}
              alt={movie.origin_name}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 px-4">
              <h1>{locale === "en" ? movie.origin_name : movie.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
