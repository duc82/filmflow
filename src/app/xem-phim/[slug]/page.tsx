import Breadcrumb from "@/app/components/Home/Breadcrumb";
import { getMovie, getMovies } from "@/app/services/movieService";
import { SearchParams } from "@/app/types";
import { MovieDetailResponse, MovieResponse } from "@/app/types/movie";
import { EyeIcon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { cn } from "@/app/utils/cn";
import VideoPlayer from "@/app/libs/VideoPlayer";
import { notFound } from "next/navigation";
import Image from "next/image";
import MovieItem from "@/app/components/Movies/MovieItem";

export default async function WatchMovie({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;

  const [data, episode, youMightAlsoLike] = await Promise.all([
    getMovie<MovieDetailResponse>(slug),
    (await searchParams).episode,
    getMovies<MovieResponse>("phim-moi-cap-nhat"),
  ]);

  if (!data || data.item.episode_current === "Trailer") {
    return notFound();
  }

  const episodeData =
    data.item.episodes[0].server_data.find(
      (server) => server.slug === episode
    ) || data.item.episodes[0].server_data[0];

  console.log(data);

  return (
    <section>
      <div className="flex items-center p-4 border-b border-slate-900/10 dark:border-slate-50/[0.06]">
        <button
          type="button"
          className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        >
          <HomeIcon className="w-6 h-6" />
        </button>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang Chủ</Breadcrumb.Item>
          {data.breadCrumb.map((breadcrumb) => {
            if (breadcrumb.isCurrent) {
              return (
                <Breadcrumb.Item key={breadcrumb.name} href={`/phim/${slug}`}>
                  {breadcrumb.name}
                </Breadcrumb.Item>
              );
            }

            return (
              <Breadcrumb.Item key={breadcrumb.name} href={breadcrumb.slug}>
                {breadcrumb.name}
              </Breadcrumb.Item>
            );
          })}
          <Breadcrumb.Item active={true}>{episodeData.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-4">
        <VideoPlayer
          src={episodeData.link_m3u8}
          poster={`${process.env.NEXT_PUBLIC_CDN_IMAGE}/uploads/movies/${data.item.poster_url}`}
          wrapperClassName="rounded-t-xl overflow-hidden"
        />
        <div className="bg-gray-100 dark:bg-slate-800 rounded-b-xl p-4 flex justify-between items-center">
          <span className="bg-red-500 py-2 px-3 text-white rounded-lg">
            {data.item.episodes[0].server_name}
          </span>
          <div className="flex space-x-2 items-center">
            <EyeIcon className="size-5" />
            <span>{data.item.view}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-100 dark:bg-slate-800 rounded-xl p-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-15 gap-3">
          {data.item.episodes[0].server_data.map((data, _i, array) => (
            <Link
              href={`/xem-phim/${slug}?episode=${data.slug}`}
              key={data.slug}
              type="button"
              className={cn(
                "text-center overflow-hidden overflow-ellipsis whitespace-nowrap p-1 rounded-lg shadow-md bg-gray-400 text-gray-50 hover:bg-violet-500 dark:bg-slate-600 dark:hover:bg-violet-600",
                episodeData.slug === data.slug &&
                  "bg-violet-500 dark:bg-violet-600"
              )}
            >
              {array.length > 1 ? `Tập ${data.name}` : data.name}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex">
          <div className="flex-[0_0_20%] pr-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_IMAGE}/uploads/movies/${data.item.thumb_url}`}
              alt={data.item.name}
              width={0}
              height={0}
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="flex-[0_0_80%] pl-4">
            <h1 className="text-xl font-bold text-violet-500">
              {data.item.name}
            </h1>
            <h2 className="italic text-sky-500">{data.item.origin_name}</h2>

            <div
              className="text-gray-500 dark:text-gray-200 mt-4"
              dangerouslySetInnerHTML={{
                __html: data.item.content.replace(/<[^>]*>/g, ""),
              }}
            ></div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Trạng Thái:{" "}
                  <span className="text-sky-500 dark:text-sky-400">
                    {data.item.episode_current}
                  </span>
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Thời Lượng:{" "}
                  <span className="text-sky-500 dark:text-sky-400">
                    {data.item.time}
                  </span>
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Năm Phát Hành:{" "}
                  <span className="text-sky-500 dark:text-sky-400">
                    {data.item.year}
                  </span>
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Chất Lượng:{" "}
                  <span className="text-sky-500 dark:text-sky-400">
                    {data.item.quality}
                  </span>
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Ngôn Ngữ:{" "}
                  <span className="text-sky-500 dark:text-sky-400">
                    {data.item.lang}
                  </span>
                </h3>
              </div>
              <div className="space-y-2">
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Đạo Diễn:{" "}
                  {data.item.director.map((director, i) => (
                    <span key={i} className="text-sky-500 dark:text-sky-400">
                      {director}
                      {i < data.item.director.length - 1 && ", "}
                    </span>
                  ))}
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Diễn Viên:{" "}
                  {data.item.actor.map((actor, i) => (
                    <span key={i} className="text-sky-500 dark:text-sky-400">
                      {actor}
                      {i < data.item.actor.length - 1 && ", "}
                    </span>
                  ))}
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Thể loại:{" "}
                  {data.item.category.map((category, i) => (
                    <span key={i}>
                      <Link
                        href={`/danh-sach/${category.slug}`}
                        className="text-sky-500 dark:text-sky-400 hover:text-red-500 transition-colors duration-300"
                      >
                        {category.name}
                      </Link>
                      {i < data.item.category.length - 1 && ", "}
                    </span>
                  ))}
                </h3>
                <h3 className="text-gray-500 dark:text-gray-200 font-bold">
                  Quốc Gia:{" "}
                  {data.item.country.map((country, i) => (
                    <span key={i}>
                      <Link
                        href={`/danh-sach/${country.slug}`}
                        className="text-sky-500 dark:text-sky-400 hover:text-red-500 transition-colors duration-300"
                      >
                        {country.name}
                      </Link>
                      {i < data.item.country.length - 1 && ", "}
                    </span>
                  ))}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h1 className="font-semibold mb-4 text-2xl lg:text-3xl text-slate-700 dark:text-white">
          Có Thể Bạn Cũng Thích
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-5">
          {youMightAlsoLike.items.map((movie) => (
            <div key={movie._id}>
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
