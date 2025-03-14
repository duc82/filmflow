import { Movie } from "@/app/types/movie";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function MovieItem({ movie }: { movie: Movie }) {
  return (
    <div className="group">
      <Link
        href={`/phim/${movie.slug}`}
        className="block relative rounded-lg w-full h-80 overflow-hidden"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_IMAGE}/uploads/movies/${movie.thumb_url}`}
          fill
          alt={movie.origin_name}
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
          className="group-hover:scale-110 transition-transform duration-500 object-cover"
        />
        <div className="absolute inset-0 invisible group-hover:bg-black/25 group-hover:visible transition-all duration-500"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-center opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition duration-500 will-change-transform z-10">
          <PlayCircleIcon className="text-sky-400 size-20" />
        </div>
      </Link>
      <div className="mt-3">
        <h3 className="text-slate-700 dark:text-white font-semibold text-base lg:text-lg lg:leading-5 hover:text-sky-400 transition-colors duration-300">
          <Link href={`/phim/${movie.slug}`}>
            {movie.name} ({movie.year})
          </Link>
        </h3>
        <div>
          {movie.category.map((category, i) => (
            <span key={i}>
              <Link
                href={`/danh-sach/${category.slug}`}
                className="text-sm text-sky-500 dark:text-sky-400 hover:text-red-500 transition-colors duration-300"
              >
                {category.name}
              </Link>
              {i < movie.category.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
