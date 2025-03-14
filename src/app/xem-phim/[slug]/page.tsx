import Breadcrumb from "@/app/components/Home/Breadcrumb";
import { getMovie } from "@/app/services/movieService";
import { SearchParams } from "@/app/types";
import { MovieDetailResponse } from "@/app/types/movie";
import { EyeIcon, HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { cn } from "@/app/utils/cn";
import VideoPlayer2 from "@/app/libs/VideoPlayer2";

export default async function WatchMovie({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;

  const episode = (await searchParams).episode;

  const data = await getMovie<MovieDetailResponse>(slug);

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
        <VideoPlayer2
          src={episodeData.link_m3u8}
          poster={`${process.env.NEXT_PUBLIC_CDN_IMAGE}/uploads/movies/${data.item.poster_url}`}
        />
        <div className="bg-gray-100 dark:bg-slate-800 rounded-b-2xl px-4 py-3 flex justify-between items-center">
          <span className="bg-red-500 py-2 px-3 text-white rounded-lg">
            {data.item.episodes[0].server_name}
          </span>
          <div className="flex space-x-2 items-center">
            <EyeIcon className="size-5" />
            <span>{data.item.view}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-100 dark:bg-slate-800 rounded-2xl px-4 py-3 space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-15 gap-3">
          {data.item.episodes[0].server_data.map((data) => (
            <Link
              href={`/xem-phim/${slug}?episode=${data.slug}`}
              key={data.slug}
              type="button"
              className={cn(
                "text-center overflow-hidden overflow-ellipsis whitespace-nowrap p-1 rounded shadow-md bg-gray-400 text-gray-50 hover:bg-violet-500 dark:bg-slate-600 dark:hover:bg-violet-600",
                episodeData.slug === data.slug &&
                  "bg-violet-500 dark:bg-violet-600"
              )}
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
