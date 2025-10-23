import Breadcrumb from "@/app/components/Breadcrumb";
import ActorList from "@/app/components/Movie/ActorList";
import DownloadButton from "@/app/components/Movies/DownloadButton";
import { getActors, getMovie, getMovies } from "@/app/services/movieService";
import { ActorResponse } from "@/app/types/actor";
import { MovieDetailResponse, MovieResponse } from "@/app/types/movie";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronUpIcon,
  HomeIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;

  const data = await getMovie<MovieDetailResponse>(slug);

  if (!data) return {};

  return {
    title: data.seoOnPage.titleHead,
    description: data.seoOnPage.descriptionHead,
    openGraph: {
      type: data.seoOnPage.og_type,
      images: data.seoOnPage.og_image,
      url: data.seoOnPage.og_url,
    },
  };
};

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [data, actor, newMovie] = await Promise.all([
    getMovie<MovieDetailResponse>(slug),
    getActors<ActorResponse>(slug),
    getMovies<MovieResponse>("phim-moi-cap-nhat"),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <section>
      <div className="flex items-center py-4 border-b border-slate-900/10 dark:border-slate-50/6">
        <button
          type="button"
          id="home-button"
          className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        >
          <HomeIcon className="w-6 h-6" />
        </button>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang Chủ</Breadcrumb.Item>
          {data.breadCrumb.map((breadcrumb) => {
            return (
              <Breadcrumb.Item
                key={breadcrumb.name}
                href={breadcrumb.slug}
                active={breadcrumb.isCurrent}
              >
                {breadcrumb.name}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
      <div className="flex items-start flex-col lg:flex-row mt-2 py-2">
        <div className="w-full lg:flex-[0_0_70%] overflow-hidden mb-6 md:mb-0 md:mr-6 sticky top-24">
          <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-2 flex flex-col mb-2 md:flex-row space-y-4 md:space-y-0">
            <div className="flex-[0_0_100%] md:flex-[0_0_40%] w-full relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_IMAGE}/uploads/movies/${data.item.thumb_url}`}
                alt={data.item.name}
                width={0}
                height={0}
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
                className="w-full h-auto object-cover rounded-xl"
              />
              {(data.item.trailer_url ||
                data.item.episodes[0].server_data[0].link_m3u8) && (
                <div className="absolute bottom-0 space-x-2 text-center w-full bg-black bg-opacity-40 dark:bg-opacity-80 py-2 m-0 rounded-t-none rounded-lg">
                  {data.item.trailer_url && (
                    <Link
                      href={data.item.trailer_url}
                      target="_blank"
                      className="hover:bg-opacity-80 bg-blue-500 text-gray-50 dark:text-gray-50 inline-block px-1 py-1 rounded"
                    >
                      Trailer
                    </Link>
                  )}

                  {data.item.episodes[0].server_data[0].link_m3u8 && (
                    <>
                      <DownloadButton />
                      <Link
                        href={`/xem-phim/${slug}`}
                        className="hover:bg-opacity-80 bg-red-500 text-gray-50 dark:text-gray-50 inline-block px-1 py-1 rounded"
                      >
                        Xem Phim
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex-[0_0_100%] md:flex-[0_0_60%] md:pl-4">
              <div className="text-center">
                <h2 className="uppercase text-lg font-bold text-violet-500">
                  {data.item.name}
                </h2>
                <h2 className="italic text-sky-500">{data.item.origin_name}</h2>
              </div>
              <div className="overflow-hidden lg:overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="w-2/6"></th>
                      <th className="w-2/3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Trạng Thái
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.episode_current}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        TMDB
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.tmdb.vote_average
                          ? Number(data.item.tmdb.vote_average).toFixed(1)
                          : "N/A"}{" "}
                        / 10 ({data.item.tmdb.vote_count})
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        IMDB
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        N/A / 10
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Số Tập
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.episode_total}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Thời Lượng
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.time}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Năm Phát Hành
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.year}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Chất Lượng
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.quality}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Ngôn Ngữ
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.lang}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Đạo Diễn
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.director.length > 0 && data.item.director[0]
                          ? data.item.director.join(", ")
                          : "Đang cập nhật"}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Diễn Viên
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.actor[0] && data.item.actor.join(", ")}
                        {!data.item.actor[0] && "Đang cập nhật"}
                      </td>
                    </tr>

                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Thể Loại
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.category
                          .map((category) => category.name)
                          .join(", ")}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 dark:border-slate-400/20">
                      <td className="py-1 pr-2 leading-5 text-sky-500 whitespace-nowrap dark:text-sky-400">
                        Quốc Gia
                      </td>
                      <td className="py-1 pl-2 leading-5 text-indigo-600 whitespace-normal dark:text-indigo-300">
                        {data.item.country
                          .map((country) => country.name)
                          .join(", ")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-2 space-y-4">
            <Disclosure defaultOpen={true}>
              <DisclosureButton className="group flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-sky-900 bg-sky-300 dark:text-sky-400 dark:bg-sky-900 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                <span>Nội dung phim</span>
                <ChevronUpIcon className="size-5 fill-sky-500 group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="px-4 pb-2 text-sm text-gray-800 dark:text-gray-200">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.item.content.replace(/<[^>]*>/g, ""),
                  }}
                ></div>
              </DisclosurePanel>
            </Disclosure>
            <Disclosure defaultOpen={true}>
              <DisclosureButton className="group flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-sky-900 bg-sky-300 dark:text-sky-400 dark:bg-sky-900 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                <span>Xem Phim</span>
                <ChevronUpIcon className="size-5 fill-sky-500 group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="px-4 pb-2 text-sm text-gray-500 dark:text-gray-200">
                {data.item.episodes[0].server_data[0].link_m3u8 && (
                  <>
                    <div className="mb-2 uppercase font-bold">
                      Server:{" "}
                      <span className="text-violet-500">
                        {data.item.episodes[0].server_name}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-2">
                      {data.item.episodes[0].server_data.map(
                        (data, i, array) => (
                          <Link
                            key={i}
                            href={`/xem-phim/${slug}?episode=${data.slug}`}
                            type="button"
                            className="text-center overflow-hidden overflow-ellipsis whitespace-nowrap px-2 py-1 rounded-lg shadow-md bg-gray-400 text-gray-50 hover:bg-violet-500 dark:bg-slate-600 dark:hover:bg-violet-600"
                          >
                            {array.length > 1 ? `Tập ${data.name}` : data.name}
                          </Link>
                        )
                      )}
                    </div>
                  </>
                )}
                {!data.item.episodes[0].server_data[0].link_m3u8 &&
                  "Link phim đang được cập nhật"}
              </DisclosurePanel>
            </Disclosure>

            {actor?.peoples && (
              <Disclosure defaultOpen={true}>
                <DisclosureButton className="group flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-sky-900 bg-sky-300 dark:text-sky-400 dark:bg-sky-900 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                  <span>Diễn viên</span>
                  <ChevronUpIcon className="size-5 fill-sky-500 group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="px-4 pb-2 text-sm text-gray-500 dark:text-gray-200">
                  <ActorList
                    peoples={actor.peoples}
                    profile_url_base={actor.profile_sizes.h632}
                  />
                </DisclosurePanel>
              </Disclosure>
            )}

            <Disclosure defaultOpen={true}>
              <DisclosureButton className="group flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-sky-900 bg-sky-300 dark:text-sky-400 dark:bg-sky-900 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                <span>Tags</span>
                <ChevronUpIcon className="size-5 fill-sky-500 group-data-open:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="px-4 pb-2 text-sm text-gray-500 dark:text-gray-200">
                <div className="flex flex-wrap gap-2">
                  {data.item.category.map((category) => (
                    <Link
                      href={`/the-loai/${category.slug}`}
                      key={category.slug}
                      className="px-2 py-1 text-sm bg-gray-400 text-gray-50 rounded-lg hover:bg-violet-500 dark:bg-slate-600 dark:hover:bg-violet-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
        <div className="w-full lg:grow">
          <h2 className="font-bold uppercase text-lg text-slate-700 dark:text-white">
            {newMovie.titlePage}
          </h2>
          <hr className="my-2 border-slate-200 dark:border-slate-400/20" />
          <ul>
            {newMovie.items.slice(0, 10).map((movie) => (
              <li key={movie._id} className="group">
                <div className="flex my-4 last:mb-0">
                  <Link
                    href={`/phim/${movie.slug}`}
                    className="block flex-[0_0_30%] relative overflow-hidden rounded-lg"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CDN_IMAGE}/uploads/movies/${movie.thumb_url}`}
                      alt={movie.name}
                      width={0}
                      height={0}
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
                      className="group-hover:scale-110 transition-transform duration-500 w-full object-cover"
                    />
                    <div className="absolute inset-0 invisible group-hover:bg-black/25 group-hover:visible transition-all duration-500"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-center opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition duration-500 will-change-transform z-10">
                      <PlayCircleIcon className="text-sky-400 size-20" />
                    </div>
                  </Link>

                  <div className="ml-4 flex-[0_0_70%]">
                    <h2 className="font-semibold text-slate-700 dark:text-white hover:text-sky-400 transition-colors duration-300">
                      <Link href={`/phim/${movie.slug}`}>
                        {movie.name} ({movie.year})
                      </Link>
                    </h2>

                    <div>
                      {movie.category.map((category, i) => (
                        <span key={i}>
                          <Link
                            href={`/the-loai/${category.slug}`}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
