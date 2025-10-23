import Breadcrumb from "@/app/components/Breadcrumb";
import Filter from "@/app/components/Movies/Filter";
import MovieItem from "@/app/components/Movies/MovieItem";
import Pagination from "@/app/components/Pagination";
import { searchMovies } from "@/app/services/movieService";
import { SearchParams } from "@/app/types";
import { MovieResponse } from "@/app/types/movie";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import { limit } from "../constants/pagination";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const sp = await searchParams;
  const keyword = sp.keyword || "";
  const sort_field = sp.sort_field || "modified.time";
  const sort_type = sp.sort_type || "desc";
  const category = sp.category;
  const country = sp.country;
  const year = sp.year;
  const page = sp.page;

  const data = await searchMovies<MovieResponse>({
    keyword,
    sort_field,
    sort_type,
    category,
    page,
    country,
    year,
    limit: 1,
  });

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

export const revalidate = 900;

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const keyword = sp.keyword || "";
  const sort_field = sp.sort_field || "modified.time";
  const sort_type = sp.sort_type || "desc";
  const category = sp.category;
  const country = sp.country;
  const year = sp.year;
  const page = sp.page;

  const data = await searchMovies<MovieResponse>({
    sort_field,
    sort_type,
    category,
    page,
    country,
    year,
    keyword,
    limit,
  });

  return (
    <section>
      <div className="flex items-center py-4 border-b border-slate-900/10 dark:border-slate-50/[0.06]">
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
      <div className="mt-2 py-2 w-full">
        <h2 className="mb-4 text-2xl uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7367F0] to-[#cecbf0]">
          {data.titlePage}
        </h2>
        <Filter defaultSortField={sort_field} type="search" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 py-5">
          {data.items.map((movie) => (
            <div key={movie._id}>
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
        <div className="py-3 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between">
          <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-black dark:text-white">
                Trang
                <span className="font-medium mx-1">
                  {data.params.pagination.currentPage}
                </span>
                /
                <span className="font-medium mx-1">
                  {Math.ceil(
                    data.params.pagination.totalItems /
                      data.params.pagination.totalItemsPerPage,
                  )}
                </span>
                | Tổng
                <span className="font-medium mx-1">
                  {data.params.pagination.totalItems}
                </span>
                Kết quả
              </p>
            </div>
          </div>
          <Pagination
            page={data.params.pagination.currentPage}
            limit={data.params.pagination.totalItemsPerPage}
            total={data.params.pagination.totalItems}
            pageRange={data.params.pagination.pageRange}
          />
        </div>
      </div>
    </section>
  );
}
