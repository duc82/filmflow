import Breadcrumb from "@/app/components/Breadcrumb";
import Filter from "@/app/components/Movies/Filter";
import MovieItem from "@/app/components/Movies/MovieItem";
import Pagination from "@/app/components/Pagination";
import { getMoviesByCountry } from "@/app/services/movieService";
import { SearchParams } from "@/app/types";
import { MovieResponse } from "@/app/types/movie";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";

export const revalidate = process.env.NEXT_PUBLIC_REVALIDATE_TIME
  ? +process.env.NEXT_PUBLIC_REVALIDATE_TIME
  : 0;

export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const { slug } = await params;
  const sort_field = (await searchParams).sort_field || "modified.time";
  const sort_type = (await searchParams).sort_type || "desc";
  const category = (await searchParams).category;
  const country = (await searchParams).country;
  const year = (await searchParams).year;
  const page = (await searchParams).page;

  const data = await getMoviesByCountry<MovieResponse>(slug, {
    sort_field,
    sort_type,
    category,
    page,
    country,
    year,
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

export default async function MovieList({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const sort_field = (await searchParams).sort_field || "modified.time";
  const sort_type = (await searchParams).sort_type || "desc";
  const category = (await searchParams).category;
  const country = (await searchParams).country;
  const year = (await searchParams).year;
  const page = (await searchParams).page;

  const data = await getMoviesByCountry<MovieResponse>(slug, {
    sort_field,
    sort_type,
    category,
    page,
    country,
    year,
  });

  return (
    <section>
      <div className="flex items-center py-4 border-b border-slate-900/10 dark:border-slate-50/[0.06]">
        <button
          type="button"
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
        <h1 className="mb-4 text-2xl uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7367F0] to-[#cecbf0]">
          {data.titlePage}
        </h1>
        <Filter
          defaultSortField={sort_field}
          defaultCountry={slug}
          type="country"
        />

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
                      data.params.pagination.totalItemsPerPage
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
            siblings={3}
          />
        </div>
      </div>
    </section>
  );
}
